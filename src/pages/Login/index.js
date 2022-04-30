import React, { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    console.log(userName, password);
    if (userName === "admin" && password === "admin") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        history.push("/analytics");
      }, 1000);
    } else {
      toast.error("Invalid login credentials");
      setUserName(null);
      setPassword(null);
    }
  };

  return (
    <div className="bg-violet-800 flex">
      <div className="w-2/3 flex justify-center h-screen items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-8xl text-white">Social Media</p>
          <p className="text-4xl text-white">Analytics Page</p>
        </div>
      </div>
      <div className="w-1/2 bg-white">
        <div className="p-5 flex flex-col justify-center h-screen">
          <div className="flex flex-col gap-10 justify-center">
            <div className="bg-violet-800 flex flex-col gap-5 rounded-lg p-5">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <AiOutlineUser className="text-white text-xl" />
                  <p className="text-white">Username</p>
                </div>
                <input
                  type="text"
                  className="w-full px-3 py-2 focus:outline-none"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <RiLockPasswordLine className="text-white text-xl" />
                  <p className="text-white">Password</p>
                </div>
                <input
                  type="password"
                  className="w-full px-3 py-2 focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-white text-lg text-violet-800 font-bold cursor-pointer px-10 py-2 rounded"
                  onClick={() => {
                    handleLogin();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className=" animate-spin text-xl" />
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
