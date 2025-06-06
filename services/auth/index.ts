import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/axios";

export const login = async (data: any) => {
  const response = await axios.post("/login", data);
  console.log("response", JSON.stringify(response));
  return response.data;
};