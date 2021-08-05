import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TCity, {getCityId} from "../../interface/city";

export interface Search {
    value: string,
    cities: TCity[],
}

const initialState: Search = {
    value: "",
    cities: [],
};

export const searchReducer = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch: (state = initialState, action: PayloadAction<string>): void => {
            state.value = action.payload;
        },
        updateSearchCities: (state = initialState, action: PayloadAction<TCity[]>): void => {
            state.cities = action.payload.map(city => { return {...city, _id: getCityId(city)}});
        },
        clearSearchCities: (state = initialState): void => {
            state.cities = [];
        },
    },
});

export const { updateSearch, updateSearchCities, clearSearchCities } = searchReducer.actions;

export default searchReducer.reducer;
