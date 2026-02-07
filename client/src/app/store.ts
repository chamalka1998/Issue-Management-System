import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import issueReducer from '../features/issues/issueSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issueReducer,
    theme: themeReducer,
  },
});

// These types are used later in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;