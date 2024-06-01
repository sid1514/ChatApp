import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfile] = useState('');
  const [password, setPassword] = useState();
  const [confirmPass, setconfirmPass] = useState();
  //const [loading, setloading] = useState(false);
  const [selectedImg, setSelectedimg] = useState(null)
  const nav = useNavigate();
  const handleSetImage = (e) => {
    console.log(e.target.files[0])
    setSelectedimg(e.target.files[0])
  };
  // const postDetails = async () => {
  //     const formData = new FormData();
  //     formData.append("image", selectedImg);

  //     try {
  //       await axios.post("http://localhost:5000/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Image uploaded successfully");
  //     } catch (error) {
  //       console.error("Error uploading image: ", error);
  //     }
  // };
  const submitHandler = async () => {
    const config = {
      headers: {
        "Content-type":"application/json"
      }
    }
   const {data}=await axios.post("http://localhost:5000/api/user/",{name,email,password},config);
   //console.log(res)
    localStorage.setItem('userInfo', JSON.stringify(data))
    
  };
  return (
    <div className=" text-center justify-center p-5 align-center ">
      <div className="flex flex-col gap-4 ">
        <input
          placeholder="enter name "
          type="text"
          className="border p-1"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          placeholder="enter email "
          type="email"
          className="border p-1"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="enter password "
          type="password"
          className="border p-1"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          placeholder="confirm password "
          type="password"
          className="border p-1"
          onChange={(e) => setconfirmPass(e.target.value)}
        ></input>
        <input
          placeholder="upload photo "
          type="file"
          className="border p-1"
          onChange={handleSetImage}
          //accept="image/*"

        ></input>
        <button >upload image</button>
      </div>
      <button className="p-2 border w-1/4 mt-4 bg-teal-300 shadow-lg mt-10" onClick={submitHandler}>
        Sign Up
      </button>
    <img src={profilePic} />
    </div>
  );
};

export default SignUp;
