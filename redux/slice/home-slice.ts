import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as services from "@/services/home";
import { handleError } from "@/utils/libs";
// import { handleError } from "@/utils/libs/utils";


interface DataState {
  loading: boolean;
  movies_data: any | null;
  fetching_movies_data: boolean;
  musics_data: any | null;
  fetching_musics_data: boolean;
  podcasts_data: any | null;
  fetching_podcasts_data: boolean;
  livestreams_data: any | null;
  fetching_livestreams_data: boolean;
  series_data: any | null;
  fetching_series_data: boolean;
  books_data: any | null;
  fetching_books_data: boolean;
  error: boolean;
}


export const getMusic = createAsyncThunk(
  "getMusic",
  async (data: any) => {
    try {
      const response = await services.getDataBySearch(data);
      console.log("getDataBySearchandType", response?.results?.music);
      return response.results.music;
    } catch (error) {
      
    }
  }
)

export const getPodcast = createAsyncThunk(
  "getPodcast",
  async (data: any) => {
    try {
      const response = await services.getDataBySearch(data);
      console.log("getPodcast", response?.results?.podcasts?.data);
      return response.results.podcasts.data;
    } catch (error) {
      
    }
  }
)



const homeSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    movies_data: null,
    fetching_movies_data: false,
    musics_data: null,
    fetching_musics_data: false,
    podcasts_data: null,
    fetching_podcasts_data: false,
    livestreams_data: null,
    fetching_livestreams_data: false,
    series_data: null,
    fetching_series_data: false,
    books_data: null,
    fetching_books_data: false,
    error: false
  } as DataState,
  reducers: {
    setMusicData: (state, action: PayloadAction<any>) => {
      state.musics_data = action.payload;
    },
    setPodcastData: (state, action: PayloadAction<any>) => {
      state.podcasts_data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMusic.pending, (state) => {
      state.fetching_musics_data = true;
      state.error = false;
    });
    builder.addCase(getMusic.fulfilled, (state, action) => {
      state.fetching_musics_data = false;
      state.musics_data = action.payload;
    });
    builder.addCase(getMusic.rejected, (state) => {
      state.fetching_musics_data = false;
      state.error = true;
      state.musics_data = null;
    });
    builder.addCase(getPodcast.pending, (state) => {
      state.fetching_podcasts_data = true;
      state.error = false;
    });
    builder.addCase(getPodcast.fulfilled, (state, action) => {
      state.fetching_podcasts_data = false;
      state.podcasts_data = action.payload;
    });
    builder.addCase(getPodcast.rejected, (state) => {
      state.fetching_podcasts_data = false;
      state.error = true;
      state.podcasts_data = null;
    });
  },
});
export const {
  setMusicData,
  setPodcastData
} = homeSlice.actions
export default homeSlice.reducer;