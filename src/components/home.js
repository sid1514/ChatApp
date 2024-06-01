import React, { useState } from "react";
import SignUp from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
const Home = () => {
  const [switchFlag, setSwitchFlag] = useState(false)
  
  
  return (
    <div className="w-min m-20 justify-center">
      <div className="w-8/12 mb-10">
        <h1 className="text-5xl font-bold w-lvw ">Chit-Chat</h1>
      </div>
      <div className="shadow-lg rounded p-10 justify-center w-1/2 h-fit bg-white m-auto h-fit">
        <div className="flex">
          <div
            className=" w-1/2 bg-purple-300/25 p-3 rounded"
            onClick={() => setSwitchFlag(!switchFlag)}
          >
            Sign In
          </div>
          <div
            className=" w-1/2 bg-blue-500 p-3 rounded text-white"
            onClick={() => setSwitchFlag(!switchFlag)}
          >
            Sign Up
          </div>
        </div>

        <div className=" m-5">{!switchFlag ? <SignUp /> : <SignIn />}</div>
      </div>
    </div>
  );
};

export default Home;
