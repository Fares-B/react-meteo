import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Search {
    value: string,
    cities: [],
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
        updateSearchCities: (state = initialState, action: PayloadAction<[]>): void => {
            state.cities = action.payload;
        },
        clearSearchCities: (state = initialState): void => {
            state.cities = [];
        },
    },
});

export const { updateSearch, updateSearchCities, clearSearchCities } = searchReducer.actions;

export default searchReducer.reducer;
