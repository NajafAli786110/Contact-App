import React, { useState } from "react";
import { updateContacts } from "../api";
import { toast } from "react-toastify";

const EditPopup = ({ setEditModalOpen, contact, setActiveContact }) => {
  const [contactField, setContactField] = useState({
    name: contact?.name,
    description: contact?.description || "",
    url: contact?.url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setEditModalOpen(false);
    setActiveContact(null);
    console.log(contact._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = await updateContacts(contact._id, contactField);
      toast.success(updatedContact);
    } catch (error) {
      console.log("Error Updating contact", error);
      toast.error(error.message);
    }
    handleClose();
  };

  return (
    <div className="fixed top-0 w-full h-screen bg-[#303030be] flex items-center justify-center z-[999]">
      <div className="flex flex-col items-center justify-center gap-11 h-[80vh] w-2/4 rounded-3xl bg-white p-9">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 relative"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => handleClose()}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Add a New Contact
          </h2>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter Contact Name"
              name="name"
              value={contactField.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Contact Description"
              name="description"
              value={contactField.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Contact URL"
              name="url"
              value={contactField.url}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
