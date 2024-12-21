import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as services from "@/services/auth";
import { handleError } from "@/utils/libs";
// import { handleError } from "@/utils/libs/utils";


interface LoginPayload {
  // Define your payload type here
  data: any;
  callback: any;
  type?: string;
}

interface AuthState {
  loading: boolean;
  login_data: any | null;
  register_data: any | null;
  error: boolean;
}



export const login = createAsyncThunk(
  "login",
  async (payload: LoginPayload, { dispatch }) => {
    console.log("first", payload);
    try {
      const res = await services.login(payload?.data);
      console.log(res?.request?.session?.user, "res session");
      if (res) {
        await AsyncStorage.setItem("token", res?.request?.session?.token);
        await AsyncStorage.setItem("user", JSON.stringify(res?.request?.session?.user));
       
        payload?.callback(res?.request?.session?.user);
      }
      return res.user;
    } catch (error) {
      handleError(error)
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    login_data: null,
  } as AuthState,
  reducers: {
    setLoginData: (state, action: PayloadAction<any>) => {
      state.login_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.login_data = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.login_data = null;
    });
  },
});
export const {
  setLoginData
} = authSlice.actions
export default authSlice.reducer;