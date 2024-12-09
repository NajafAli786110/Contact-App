import {
  PencilIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ContactFormPopup from "../modals/ContactFormPopup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../redux/AuthSlice";
import { useEffect } from "react";

const Sidebar = ({ setCreateNewContact }) => {
  const [createContactModalOpen, setCreateContactModalOpen] = useState(false);
  const authCheck = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChangeContacts = () => {
    setCreateNewContact((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-[250px] bg-black text-white min-h-screen py-8 px-4">
      <div className="text-white text-2xl font-bold mb-8">
        <Link to="/" className="hover:text-gray-400">
          Contact App
        </Link>
      </div>

      {/* Links */}
      <div className="flex flex-col space-y-4 flex-grow">
        <Link
          to="/"
          className="flex items-center p-2 rounded-lg bg-transparent hover:bg-gray-700 transition-all duration-300"
        >
          <BookmarkIcon className="w-6 h-6 mr-3 text-white" />
          <span className="text-sm">My Contact</span>
        </Link>
        <Link
          className="flex items-center p-2 rounded-lg bg-transparent hover:bg-gray-700 transition-all duration-300"
          onClick={() => setCreateContactModalOpen(true)}
        >
          <PencilIcon className="w-6 h-6 mr-3 text-white" />
          <span className="text-sm">Add Contact</span>
        </Link>
        <Link className="flex items-center p-2 rounded-lg bg-transparent hover:bg-gray-700 transition-all duration-300">
          <PencilIcon className="w-6 h-6 mr-3 text-white" />
          <span className="text-sm">Edit Profile</span>
        </Link>
        <Link
          onClick={() => dispatch(userlogout())}
          className="flex items-center p-2 rounded-lg bg-transparent hover:bg-gray-700 transition-all duration-300"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3 text-white" />
          <span className="text-sm">Logout</span>
        </Link>
      </div>

      {/* User Info (placed at the bottom) */}
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center mr-4">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">{authCheck.user.username}</h2>
          <p className="text-sm text-gray-300">{authCheck.user.email}</p>
        </div>
      </div>

      {createContactModalOpen && (
        <ContactFormPopup
          setCreateContactModalOpen={setCreateContactModalOpen}
          handleChangeContacts={handleChangeContacts}
        />
      )}
    </div>
  );
};

export default Sidebar;
