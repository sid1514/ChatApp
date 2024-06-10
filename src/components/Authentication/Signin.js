import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hideFlag, setHideFlage] = useState(false);
  const nav = useNavigate();
  const [ErrorMsg, setErrormessage] = useState(null);
  const server = process.env.SERVER_URI;
  console.log(server);
  const handleSignIn = async () => {
    if (!email && !password) {
      setErrormessage("enter field email and password");
      return;
    }
    try {
      const {data} = await axios.post(
        `http://localhost:5000/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      nav("/Chatpage");
    } catch (e) {
      console.log(e);
      setErrormessage("enter correct email and password");
    }
  };
  return (
    <div className=" text-center justify-center p-5 align-center font-bold">
      {ErrorMsg ? <ErrorMessage message={ErrorMsg} /> : null}
      <div className="flex flex-col gap-4 ">
        <label>Email Address</label>
        <div>
          <input
            placeholder="enter email "
            type="email"
            className="border p-3 w-1/2"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <label>Password</label>
        <div>
          <input
            placeholder="enter password "
            type={!hideFlag ? "password" : "text"}
            className="border p-3 w-1/2 ml-10"
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
          className="py-3 border w-1/4 mt-4 bg-teal-300 shadow-lg"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
