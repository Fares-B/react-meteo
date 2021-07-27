import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Theme {
    dark: boolean,
};

const initialState: Theme = {
    dark: false,
};

export const themeReducer = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state = initialState, action: PayloadAction<boolean>): void => {
            state.dark = action.payload;
        },
    },
});

export const { changeTheme } = themeReducer.actions;

export default themeReducer.reducer;
