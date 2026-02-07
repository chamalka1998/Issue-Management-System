import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { initialState } from '../../types';
import type { Issue } from '../../types';
import type { RootState } from '../../app/store';

const API = `${BASE_URL}/api/issues`;

// 1. Get all issues (GET)
export const fetchIssues = createAsyncThunk('issues/fetchAll', async () => {
  const response = await axios.get(API);
  return response.data as Issue[];
});

// 2. Add new issue (POST) - NEEDS TOKEN
export const addIssue = createAsyncThunk('issues/add', async (data: Issue, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.user?.token; // Grabbing token from Auth slice


  const response = await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data as Issue;
});

// 3. Update an issue (PUT) - NEEDS TOKEN
// Update the thunk to accept "updates" which can be status OR priority
export const updateIssue = createAsyncThunk(
  'issues/update',
  async (
    { id, updates }: { id: string; updates: { status?: string; priority?: string } },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token;

    // We send 'updates' directly as the body (e.g., { status: 'Open' } or { priority: 'High' })
    const response = await axios.put(`${API}/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  }
);

// 4. Delete an issue (DELETE) - NEEDS TOKEN
export const deleteIssue = createAsyncThunk('issues/delete', async (id: string, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.user?.token;

  await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      // Add
      .addCase(addIssue.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateIssue.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // Delete
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.items = state.items.filter((issue) => issue._id !== action.payload);
      });
  },
});

export default issueSlice.reducer;