import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    isModalOpen: false, // ✅ NEW: Track if a modal is active
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    setModalOpen: (state, action) => { // ✅ NEW: Action to toggle header
      state.isModalOpen = action.payload;
    },
  },
});

export const { changeLanguage, setModalOpen } = configSlice.actions;

export default configSlice.reducer;