import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
  otp: string | null; 
  backendOtp:string|null
}

const initialState: OtpState = {
  otp: null,
  backendOtp:null
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    
    setBackendOtp:(state, action: PayloadAction<string>) => {
      state.backendOtp = action.payload;
    },

    clearOtp: (state) => {
      state.otp = null;
      state.backendOtp=null;
    },
  },
});

export const { setOtp, clearOtp,setBackendOtp } = otpSlice.actions;
export default otpSlice.reducer;
