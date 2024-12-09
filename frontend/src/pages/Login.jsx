import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userlogin } from "../redux/AuthSlice";

const Login = () => {
  const [loginField, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // OnChange Handler
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setLoginFields({
      ...loginField,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!loginField.email || !loginField.password) {
      toast.error("Please fill all details properly");
      return;
    }

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail(loginField.email)) {
      toast.error("Please provide a valid email address");
      return;
    }
    setLoading(true);
    try {
      const login = await axios.post(
        `http://localhost:5000/api/auth/login`,
        {
          email: loginField.email,
          password: loginField.password,
        },
        { withCredentials: true }
      );
      toast.success(login.data.message);
      
      try {
        dispatch(
          userlogin({ username: login.data.username, email: login.data.email, token: login.data.token })
        );
      } catch (error) {
        console.log("not dispatch", error);
      }

      setLoginFields({
        email: "",
        password: "",
      });
      
      setLoading(false);
      navigate("/");
    } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please login to your account
        </p>
        <form className="space-y-4">
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
              onChange={onChangeValue}
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              onChange={onChangeValue}
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
