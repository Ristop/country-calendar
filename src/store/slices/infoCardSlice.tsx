import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VisitedCountry } from '../../types/VisitedCountry';

interface CountryInfoState {
  country?: VisitedCountry;
}

const initialState: CountryInfoState = {};

const infoCardSlice = createSlice({
  name: 'infoCard',
  initialState,
  reducers: {
    setCountryState: (state, action: PayloadAction<VisitedCountry | undefined>) => {
      state.country = action.payload;
    },
  },
});

export const { setCountryState } = infoCardSlice.actions;

export default infoCardSlice.reducer;
