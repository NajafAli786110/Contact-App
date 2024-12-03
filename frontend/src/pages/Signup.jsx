import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.username) {
      toast.error("Please fill all details properly");
      return;
    }

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail(signUpData.email)) {
      toast.error("Please provide a valid email address");
      return;
    }

    setLoading(true);
    try {
      const userRegister = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
        }
      );
      toast.success(userRegister.data.message || "User Register Successully");
      setSignUpData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed, please try again."
        );
        setLoading(false);
      } else if (error.request) {
        toast.error("Network error, please check your internet connection.");
        setLoading(false);
      } else {
        toast.error("Unexpected error occurred, please try again later.");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">Join us today!</p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={onChangeHandler}
              id="name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
