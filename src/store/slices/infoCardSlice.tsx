import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VisitedCountry } from '../../types/VisitedCountry';

interface CountryInfoState {
  country?: VisitedCountry;
  highlighted: string[];
}

const initialState: CountryInfoState = {
  country: undefined,
  highlighted: []
};

const infoCardSlice = createSlice({
  name: 'infoCard',
  initialState,
  reducers: {
    setCountryState: (state, action: PayloadAction<VisitedCountry | undefined>) => {
      state.country = action.payload;
    },
    setHighLighted: (state, action: PayloadAction<string[]>) => {
      state.highlighted = action.payload;
    },
  },
});

export const { setCountryState, setHighLighted } = infoCardSlice.actions;

export default infoCardSlice.reducer;
