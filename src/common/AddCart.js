import axios from "axios";

const baseurl = "https://fakestoreapi.com";
export const addCart = async (data) => {
  const response = await axios.post(baseurl + "/carts", data);
  return response.data;
};
