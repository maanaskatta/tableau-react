import React, { useState, useEffect } from "react";
import {
  AiOutlineCar,
  AiOutlineHistory,
  AiOutlineReconciliation,
} from "react-icons/ai";
import { BiBuildingHouse, BiCategory } from "react-icons/bi";
import { BsCardList, BsReceipt } from "react-icons/bs";
import { FaCoins, FaTools, FaUsers } from "react-icons/fa";
import { GiOpenGate } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Gender from "./Gender";
import Dashboard from "./Dashboard";
import Intents from "./Intents";
import ProductCategory from "./ProductCategory";
import Location from "./Location";
import ProblemsTrend from "./ProblemsTrend";
import ProblemsOverview from "./ProblemsOverview";
import Vendors from "./Vendors";
import axios from "axios";
import Loading from "../../components/Loading";

const analyticTiles = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <Dashboard />,
  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <Vendors />,
  },
  {
    label: "Intents",
    path: "/intents",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <Intents />,
  },
  {
    label: "ProductCategory",
    path: "/productCategory",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <ProductCategory />,
  },
  {
    label: "Location",
    path: "/location",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <Location />,
  },
  {
    label: "ProblemsTrend",
    path: "/problemsTrend",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <ProblemsTrend />,
  },
  {
    label: "ProblemsOverview",
    path: "/problemsOverview",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <ProblemsOverview />,
  },
  {
    label: "Gender",
    path: "/gender",
    icon: () => <HiOutlineSpeakerphone />,
    render: () => <Gender />,
  },
];

const NavBar = () => {
  const history = useHistory();
  const [currentTileIndex, setCurrentTileIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-3 justify-center items-center p-3">
        <div className="py-5 bg-white rounded-full">
          {/* <img src={ASSLogo} alt="" width={150} /> */}
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              history.push("/login");
              localStorage.setItem("role", null);
            }}
            className="bg-purple-100 text-black px-3 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
        <div className="flex justify-center items-center">
          <hr className="w-60"></hr>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {analyticTiles.map((tile, index) => {
          return (
            <div
              className={`${
                index === currentTileIndex
                  ? "bg-white text-purple-900"
                  : "text-white "
              } px-5 py-3 hover:bg-black hover:text-white`}
            >
              <Link
                to={`/analytics` + tile.path}
                className=" font-semibold py-4"
                onClick={() => {
                  setCurrentTileIndex(index);
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl ${
                      index === currentTileIndex
                        ? "text-purple-800"
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
      "https://gist.githubusercontent.com/maanaskatta/3cf75f6b39dae46726d38eda2bd3e72a/raw/69185e00fbb9d1befe49b4811ca4b899bb55d248/TableauLinks.json"
    );

    if (res.data && Object.keys(res.data).length > 0) {
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
          <div className="flex w-1/5 bg-purple-900 h-screen overflow-y-auto overflow-x-hidden">
            <NavBar />
          </div>
          <div className="w-full flex flex-col">
            <Switch>
              {analyticTiles.map((tile) => (
                <Route
                  path={`/analytics` + tile.path}
                  component={() => tile.render(tile.label)}
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
