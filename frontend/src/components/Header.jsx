import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../redux/AuthSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlelogoutUser = () => {
    try {
      const logout = dispatch(userlogout());
      if (logout) {
        return toast.success("User Logout Successfully!");
      }
    } catch (error) {
      console.log("Error Comes while logout User", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">Contact App</Link>
      </div>

      <nav>
        <ul className="flex space-x-6 items-center">
          {/* Show Username or Login */}
          <li>
            {isLoggedIn ? (
              <>
                <span className="text-lg">
                  Welcome, <b>{user}</b>
                </span>
                <button
                  onClick={handlelogoutUser}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300 ml-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
