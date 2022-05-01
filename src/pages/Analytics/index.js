/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Tableau from "tableau-react";
import Loading from "../../components/Loading";
import Logo from "../../Logo.png";
import { GoSignOut } from "react-icons/go";

const analyticTiles = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "Intents",
    path: "/intents",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "ProductCategory",
    path: "/productCategory",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "Location",
    path: "/location",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "ProblemsTrend",
    path: "/problemsTrend",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "ProblemsOverview",
    path: "/problemsOverview",
    icon: () => <HiOutlineSpeakerphone />,
  },
  {
    label: "Gender",
    path: "/gender",
    icon: () => <HiOutlineSpeakerphone />,
  },
];

const NavBar = () => {
  const history = useHistory();
  const [currentTileIndex, setCurrentTileIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5 justify-center items-center p-3">
        <div>
          <img src={Logo} alt="" width={120} />
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              history.push("/login");
              localStorage.setItem("role", null);
            }}
            className="bg-red-600 text-white px-2 py-1 rounded flex justify-center items-center gap-2"
          >
            <GoSignOut size={20} />
            <p>Sign Out</p>
          </button>
        </div>
        <div className="flex justify-center items-center">
          <hr className=" w-56"></hr>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {analyticTiles.map((tile, index) => {
          return (
            <div
              className={`${
                index === currentTileIndex
                  ? "bg-white text-blue-700"
                  : "text-white "
              } px-5 h-10 hover:bg-black hover:text-white flex items-center`}
            >
              <Link
                to={`/analytics` + tile.path}
                className=" font-semibold py-4 flex items-center w-full"
                onClick={() => {
                  setCurrentTileIndex(index);
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl ${
                      index === currentTileIndex
                        ? "text-blue-700"
                        : "text-white"
                    }`}
                  >
                    {tile.icon()}
                  </div>
                  {tile.label}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Analytics() {
  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTableauLinks = async () => {
    setIsLoading(true);
    const res = await axios.get(
      "https://gist.githubusercontent.com/maanaskatta/3cf75f6b39dae46726d38eda2bd3e72a/raw/4d6c95481981d08dcf88960940c0656fd2889473/TableauLinks.json"
    );

    if (res.data && Object.keys(res.data).length > 0) {
      console.log("Links", res.data);
      setLinks(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableauLinks();
  }, []);

  if (!isLoading) {
    if (links) {
      return (
        <div className="flex w-full ">
          <div className="flex w-1/5 bg-blue-700 h-screen overflow-y-auto overflow-x-hidden">
            <NavBar />
          </div>
          <div className="w-full flex flex-col">
            <Switch>
              {analyticTiles.map((tile) => (
                <Route
                  path={`/analytics` + tile.path}
                  component={() => (
                    <div className="h-screen bg-blue-200 overflow-auto">
                      <Tableau
                        options={{
                          ...(tile.label === "Dashboard"
                            ? {
                                width: 1290,
                                height: 2800,
                              }
                            : {
                                height: screen.height - 200,
                                width: screen.width - 500,
                              }),
                        }}
                        parameters={{
                          device: "desktop",
                        }}
                        url={links[tile.label]}
                      />
                    </div>
                  )}
                />
              ))}
            </Switch>
            <Redirect to={`/analytics` + analyticTiles[0].path} />
          </div>
        </div>
      );
    }
    return <p>No data found...</p>;
  } else {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
}
