import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/axios";

export const getDashboardData = async (data: any) => {
  const response = await axios.get(`/search?q=${data.search}`);
  return response.data;
};

export const getDataBySearch = async (data: any) => {
  const response = await axios.get(`/search?q=${data.search}`);
  return response.data;
}