import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [error, seterror] = useState("");
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setdata({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/register";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        seterror(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="w-[100vw] h-[100vh] flex flex-row-reverse">
        <div className="w-[50vw] h-100% bg-black flex flex-col justify-center items-center child:m-5">
          <h1 className="text-5xl text-white">
            Welcome Back, have an account?
          </h1>
          <Link to="/login">
            <button
              type="button"
              className=" bg-white m-5 p-3 w-[10vw] rounded-xl"
            >
              Sign In
            </button>
          </Link>
        </div>
        <div className="w-[50vw] h-100% bg-white flex flex-col justify-center items-center ">
          <h1 className="m-5 p-3 bg-slate-400 rounded-lg">Create Account</h1>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col child:m-5 child:p-3 child:w-[20vw] child:rounded-xl child:dark:bg-slate-300 child:dark:outline-black child:shadow-xl"
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className=""
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className=""
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className=""
            />
            {error && <div>{error}</div>}
            <button type="submit" className="bg-slate-400 p-3 rounded-xl">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
