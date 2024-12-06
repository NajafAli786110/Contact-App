const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserContact = mongoose.model("contacts", contactSchema, "contacts");
module.exports = UserContact;