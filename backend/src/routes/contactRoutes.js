const express = require("express");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
} = require("../controllers/ContactController");
const ContactRouter = express.Router();

ContactRouter.route("/").get(getContact).post(createContact);

ContactRouter.route("/:id")
  .get(getContactById)
  .patch(updateContact)
  .delete(deleteContact);

module.exports = ContactRouter;
