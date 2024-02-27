import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Reducers/registerReducer.js";
import { useSelector } from "react-redux";

const Profile = () => {
  const registerinfo = useSelector((state) => state.register.value);
  const [username, setUsername] = useState("");
  const email = registerinfo.email;
  const dispatch = useDispatch();
  const style = {
    position: "bottom-center",
    backgroundColor: "rgb(17 24 39)",
    theme: "dark",
  };
  const editdone = () => {
    toast.success("Username updated Succesfully", style);
  };
  const editntdone = () => {
    toast.error("Something went wrong..Try again later", style);
  };
  const handlechange = () => {
    fetch("https://swiftcart-py79.onrender.com/updateusername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "Updated") {
          editdone();
          dispatch(
            register({
              username: username,
              email: email,
            })
          );
        } else {
          editntdone();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font min-h-screen">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-4xl font-medium title-font text-white mb-1">
            Edit Your Profile
          </h1>
          <h2 className="text-xl text-indigo-400 tracking-widest font-medium title-font">
            Change Your Username
          </h2>
          <div className="mt-40 mx-auto mb-6 w-3/12">
            <label
              className="block uppercase tracking-wide text-indigo-400 text-sm font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="grid-first-name"
              type="text"
              placeholder={registerinfo.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            className="flex text-white bg-indigo-500 mx-auto border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handlechange}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
