import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    loading: false, // ✅ NEW: Track loading state
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.loading = false; // ✅ Turn off loading when results arrive
    },
    setGptLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, setGptLoading } = gptSlice.actions;

export default gptSlice.reducer;