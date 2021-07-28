import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Search {
    value: string,
};

const initialState: Search = {
    value: "",
};

export const searchReducer = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch: (state = initialState, action: PayloadAction<string>): void => {
            state.value = action.payload;
        },
    },
});

export const { updateSearch } = searchReducer.actions;

export default searchReducer.reducer;
