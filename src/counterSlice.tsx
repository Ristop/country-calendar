import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryInfo } from './types/CountryInfo';

interface CountryInfoState {
  countryInfo?: CountryInfo;
}

const initialState: CountryInfoState = {};

const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCountryState: (state, action: PayloadAction<CountryInfo | undefined>) => {
      state.countryInfo = action.payload;
    },
  },
});

export const { setCountryState } = counterSlice.actions;

export default counterSlice.reducer;
