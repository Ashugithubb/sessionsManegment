'use client'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { any } from 'zod';



export interface Sessions {
 sessionId: number,
  device: string,
  IpAddress: string,
  loginTime: string
  isActive: boolean,     
}


interface SessionState {
  sessionlist: Sessions[] ;
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessionlist: [],
  loading: false,
  error: null,
};

export const getMySessionThunk = createAsyncThunk(
  'myfeedback/getmyFeedback',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/session-table`, {
        withCredentials: true,
      });
   
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);
const mySessionSlice = createSlice({
  name: 'myfeedbacklist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMySessionThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMySessionThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.sessionlist = action.payload;
      })
      .addCase(getMySessionThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
;

export default mySessionSlice.reducer;