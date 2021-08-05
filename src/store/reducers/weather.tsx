import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TWeather from '../../interface/weather';

interface Weather {
    weather: TWeather[];
}

const initialState: Weather = {
    weather: [],
};

export const weatherReducer = createSlice({
    name: "weather",
    initialState,
    reducers: {
        appendWeather: (state = initialState, action: PayloadAction<TWeather>): void => {
            state.weather = [...state.weather, action.payload];
        },
        appendAllWeather: (state = initialState, action: PayloadAction<TWeather[]>): void => {
            state.weather = action.payload;
        },
        updateWeather: (state = initialState, action: PayloadAction<TWeather>): void => {
            const weathersTemp: TWeather[] = state.weather.filter(w => w._id !== action.payload._id);
            state.weather = [...weathersTemp, action.payload];
        },
    },
});

export const { appendWeather, appendAllWeather, updateWeather } = weatherReducer.actions;

export default weatherReducer.reducer;
