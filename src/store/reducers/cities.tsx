import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TCity, {getCityId} from "../../interface/city";

interface Cities {
    cities: TCity[]
}

const initialState: Cities = {
    cities: [],
};

export const citiesReducer = createSlice({
    name: "cities",
    initialState,
    reducers: {
        appendCity: (state = initialState, action: PayloadAction<TCity>): void => {
            state.cities = [...state.cities, action.payload];
        },
        removeCity: (state = initialState, action: PayloadAction<TCity>): void => {
            state.cities = state.cities.filter(city => getCityId(city) !== getCityId(action.payload));
        },

    },
});

export const { appendCity, removeCity } = citiesReducer.actions;

export default citiesReducer.reducer;
