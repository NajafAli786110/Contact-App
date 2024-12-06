import {
  PencilIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[250px] bg-black text-white min-h-screen py-8 px-4">
      {/* Website Name */}
      <div className="text-white text-2xl font-bold mb-8">
        <Link to="/" className="hover:text-gray-400">
          Contact App
        </Link>
      </div>

      {/* Links */}
      <div className="flex flex-col space-y-4 flex-grow">
        <LinkTo href="/" icon={BookmarkIcon} text="My Contact" />
        <LinkTo href="/add-contact" icon={PencilIcon} text="Add Contact" />
        <LinkTo href="/edit-profile" icon={PencilIcon} text="Edit Profile" />
        <LinkTo href="/logout" icon={ArrowLeftOnRectangleIcon} text="Logout" />
      </div>

      {/* User Info (placed at the bottom) */}
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center mr-4">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">John Doe</h2>
          <p className="text-sm text-gray-300">johndoe@example.com</p>
        </div>
      </div>
    </div>
  );
};

const LinkTo = ({ href, icon: Icon, text }) => {
  return (
    <Link
      to={href}
      className="flex items-center p-2 rounded-lg bg-transparent hover:bg-gray-700 transition-all duration-300"
    >
      <Icon className="w-6 h-6 mr-3 text-white" />
      <span className="text-sm">{text}</span>
    </Link>
  );
};

export default Sidebar;
