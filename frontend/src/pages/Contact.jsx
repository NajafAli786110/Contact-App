import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchContacts from "../components/UserContactData";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteContacts } from "../api";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import EditPopup from "../modals/EditPopup";

function Contact() {
  const fetchContact = useFetchContacts();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const handleDeleteContact = async (id) => {
    try {
      const deleteUserContact = await deleteContacts(id);
      if (deleteUserContact) {
        toast.success(deleteUserContact);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const editModelHandler = (contact) => {
    setEditModalOpen(true);
    setActiveContact(contact);
  };
  useEffect(() => {
    fetchContact();
  }, [handleDeleteContact]);

  const contacts = useSelector((state) => state.contacts.contact);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="w-3/4 px-12 py-14 flex flex-col gap-8 align-baseline justify-start">
        <h1 className="text-3xl font-bold">My Contacts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <div
                key={index}
                className="relative bg-[#0a0a0a] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 ease-in-out min-h-[250px] group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-lg opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full mb-3 shadow-md">
                    <h2 className="text-white font-bold text-lg">
                      {contact.name[0]}
                    </h2>
                  </div>

                  <Link to={contact.url} target="_blank">
                    <h2 className="text-xl font-semibold text-white group-hover:text-gray-200 transition duration-300">
                      {contact.name}
                    </h2>
                  </Link>

                  <p className="text-sm text-white">{contact.description}</p>

                  {/* Edit and Delete Icons */}
                  <div className="mt-6 flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-700 transition duration-200">
                      <PencilIcon
                        className="w-5 h-5 text-white"
                        onClick={() => editModelHandler(contact)}
                      />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700 transition duration-200">
                      <TrashIcon
                        className="w-5 h-5 text-white"
                        onClick={() => handleDeleteContact(contact._id)}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Not Contact Found ! Create One!...</p>
          )}
        </div>
      </div>
      {editModalOpen && (
        <EditPopup
          setEditModalOpen={setEditModalOpen}
          contact={activeContact}
          setActiveContact={setActiveContact}
        />
      )}
    </div>
  );
}

export default Contact;
