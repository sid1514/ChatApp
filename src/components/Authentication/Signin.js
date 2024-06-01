import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hideFlag, setHideFlage] = useState(false);
  const nav = useNavigate();
  const handleSignIn = async() => {
    try {
      if (email && password) {
        const {data} = await axios.post("http://localhost:5000/api/user/login", {
          email:email,
          password:password,
        });
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (data) {
          nav("/Chatpage");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" text-center justify-center p-5  align-center">
      <div className="flex flex-col gap-4 ">
        <label>Email Address</label>
        <div>
          <input
            placeholder="enter email "
            type="email"
            className="border p-1 w-1/2"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <label>Password</label>
        <div>
          <input
            placeholder="enter password "
            type={!hideFlag ? "password" : "text"}
            className="border p-1 w-1/2 ml-10"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label onClick={() => setHideFlage(!hideFlag)} className="ml-2">
            show
          </label>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="p-2 border w-1/4 mt-4 bg-teal-300 shadow-lg"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button className="p-2 border w-1/4 mt-4 bg-cyan-800 text-white ml-1 shadow-lg">
          login as guest
        </button>
      </div>
    </div>
  );
};

export default SignIn;
