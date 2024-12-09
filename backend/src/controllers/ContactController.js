const UserContact = require("../model/contactModal");

async function getContact(req, res) {
  try {
    const contact = await UserContact.find({createdBy: req.user.userID});
    return res.status(200).json({ message: "Here's Your Response", contact });
  } catch (error) {
    console.log("Error Comes while Get contact", error);
    return res.status(400).json({ message: "Error Comes while Get contact" });
  }
}
async function getContactById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Error 404" });
  }
  try {
    const contact = await UserContact.find({ _id: id });
    return res.status(200).json({ message: "Contact Found", contact });
  } catch (error) {
    console.log(
      "Error Comes while fetching specific contact through I'd ",
      error
    );
    return res.status(400).json({
      message: "Error Comes while fetching specific contact through I'd",
    });
  }
}
async function createContact(req, res) {
  const { name, description, url } = req.body;
  if (!name || !description || !url) {
    return res.status(400).json({
      message: "Please Fill All Details Properly!..",
    });
  }
  try {
    const contact = await UserContact.create({
      name,
      description,
      url,
      createdBy: req.user.userID,
    });

    return res.status(200).json({ message: "Contact Created Successfully" });
  } catch (error) {
    console.log("Error Comes while Creating Contact ", error);
    return res
      .status(400)
      .json({ message: "Error Comes while Creating Contact" });
  }
}
async function updateContact(req, res) {
  const { id } = req.params;
  const updatedContact = req.body;
  try {
    const updateContact = await UserContact.findByIdAndUpdate(
      { _id: id },
      updatedContact,
      { new: true }
    );
    
    return res.status(200).json({
      message: "Your contact successufully Updated!...",
      updateContact,
    });
  } catch (error) {
    console.log("Error Comes while Updating Contact ", error);
    return res
      .status(400)
      .json({ message: "Error Comes while Updating Contact" });
  }
}
async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    const deleteContact = await UserContact.findByIdAndDelete({ _id: id });
    if (deleteContact) {
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    }
  } catch (error) {
    console.log("Error Comes while delete contact ", error);
    return res
      .status(400)
      .json({ message: "Error Comes while delete contact" });
  }
}

module.exports = {
  getContact,
  updateContact,
  deleteContact,
  createContact,
  getContactById,
};
