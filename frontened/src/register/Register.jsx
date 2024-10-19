import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";


const Register = () => {

  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();
  const {setAuthUser} = useAuth();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    if(inputData.Password !== inputData.ConfirmPassword.toLowerCase()){
        setLoading(false)
        return toast.error("Password doesn't match")
    }
    try {
        const register = await axios.post('/api/authh/register',inputData)
        const data = register.data;
        if(data.success === false){
            setLoading(false)
            toast.error(data.message);
            console.log(data.message);
        }
        toast.success(data.message);
        localStorage.setItem('CHAT APP',JSON.stringify(data))
        setLoading(false)
        setAuthUser(data)

        navigate('/login')
    } catch (error) {
        setLoading(false)
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
 }
  
  const handleInputs = (e) => {
    setInputData({
        ...inputData,[e.target.id]:e.target.value
    })
  }
  console.log(inputData);

  const selectedGender = (selectedGender) =>{
    setInputData((prev)=>({
        ...prev , Gender:selectedGender === inputData.Gender ? '' :selectedGender
    }))
  }

  return (
    <div className="flex flex-col items-center text-black justify-center mix-w-full mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding
          backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-bold text-center text-gray-300 ">
          Register
          <span className="text-gray-950">Chatters</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Fullname :
              </span>
            </label>
            <input
              id="Fullname"
              onChange={handleInputs}
              type="text"
              placeholder="Enter Your Fullname"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Username :
              </span>
            </label>
            <input
              id="Username"
              onChange={handleInputs}
              type="text"
              placeholder="Enter Your Username"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Email :
              </span>
            </label>
            <input
              id="Email"
              onChange={handleInputs}
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
              onChange={handleInputs}
              placeholder="Enter Your Password"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Confirm Password :
              </span>
            </label>
            <input
              id="ConfirmPassword"
              onChange={handleInputs}
              type="text"
              placeholder="Enter Your Confirm Password"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <div id="Gender" className="flex gap-2">
            <label className="cursor-pointer label flex gap-2 ">
              <span className="label-text font-semibold text-gray-950">
                Male
              </span>
              <input
                onChange={() => selectedGender("Male")}
                checked={inputData.Gender === "Male"}
                type="checkbox"
                className="checkbox checkbox-info"
              />
            </label>
            <label className="cursor-pointer label flex gap-2 ">
              <span className="font-semibold text-gray-950 label-text">
                Female
              </span>
              <input type="checkbox" onChange={() => selectedGender("Female")}
                checked={inputData.Gender === 'Female'} className="checkbox checkbox-info" />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg text-white rounded-lg hover:bg-gray-900 hover:scale-105"
          >
            {loading ? "loading.." : "Register"}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-800">
            Don't Have an account?
            <Link to={"/login"}>
              <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950">
                Login Now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
