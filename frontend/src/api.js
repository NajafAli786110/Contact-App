import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const fetchContacts = async () => {
  const response = await api.get("/contact");
  return response.data.contact;
};

export const deleteContacts = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data.message;
};

export const updateContacts = async (id, contactField) => {
  const response = await api.patch(`/contact/${id}`, contactField, {withCredentials: true});
  return response.data.message;
};