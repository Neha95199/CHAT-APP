import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
 const [userInput,setUserInput] = useState({})
 const [loading,setLoading] = useState(false)
 const navigate = useNavigate();
 const {setAuthUser} = useAuth();
 
 const handleInput=(e)=>{
  setUserInput({
    ...userInput,[e.target.id]:e.target.value
})
 }
 console.log(userInput);

 const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
        const login = await axios.post(`/api/authh/login`,userInput);
        const data = login.data;
        if(data.success === false){
            setLoading(false)
            console.log(data.message);
        }
        toast.success(data.message);
        localStorage.setItem('CHAT APP',JSON.stringify(data))
        setAuthUser(data)
        setLoading(false)
        navigate('/')
    } catch (error) {
        setLoading(false)
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
 }
  return (
    <div className="flex flex-col items-center text-black justify-center mix-w-full mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding
        backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-bold text-center text-gray-300 ">
          LogIn &nbsp;
          <span className="text-gray-950">Chatters</span>
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <label className="label p-2">
                <span className="font-bold text-gray-950 text-xl label-text">
                  Email :
                </span>
              </label>
              <input
                id="Email"
                onChange={handleInput}
                type="email"
                placeholder="Enter Your Email"
                required
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-bold text-gray-950 text-xl label-text">
                  Password :
                </span>
              </label>
              <input
                id="Password"
                type="Password"
                onChange={handleInput}

                placeholder="Enter Your Password"
                required
                className="w-full input input-bordered h-10"
              />
            </div>
            <button
              type="submit"
              className="mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg text-white rounded-lg hover:bg-gray-900 hover:scale-105"
            >
              {loading ? "loading..":"Login"}
            </button>
          </form>
          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-800">
              Don't Have an account?
              <Link to={'/register'}>
                <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950">
                  Register Now!
                </span>
              </Link>
            </p>
          </div>

      </div>
    </div>
  );
};

export default Login;
