import { useDispatch } from "react-redux";
import { fetchContacts } from "../api";
import { getContact } from "../redux/ContactSlice";
import { toast } from "react-toastify";

const useFetchContacts = () => {
  const dispatch = useDispatch();
  const loadContact = async () => {
    try {
      const contact = await fetchContacts();
      return dispatch(getContact(contact));
    } catch (error) {
      console.log("Contact not found error!", error);
      toast.error("Contact not found error!");
    }
  };

  return loadContact;
};

export default useFetchContacts;
