import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

const baseURL = "https://zymo.tv/api/";

const instance = axios.create({
 
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {  
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const status = err.response ? err.response.statusCode : null;
    if (status === 401) {
      AsyncStorage.removeItem("token");
      router.replace("/login");
    }
    if (status === 403) {
      AsyncStorage.removeItem("token");
      router.replace("/login");
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default instance;
