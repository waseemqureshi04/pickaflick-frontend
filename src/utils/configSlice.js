import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    isModalOpen: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { changeLanguage, setModalOpen } = configSlice.actions;

export default configSlice.reducer;