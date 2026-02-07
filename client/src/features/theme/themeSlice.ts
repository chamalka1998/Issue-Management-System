import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  // Check localStorage directly inside initialState
  initialState: {
    darkMode: localStorage.getItem('darkMode') === 'true', 
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      // Save as a string "true" or "false"
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;