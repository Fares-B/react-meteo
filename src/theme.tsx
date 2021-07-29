interface Theme {
    // color: string,
}
const defaultTheme = {
    colors: {
        headerColor: "white",
        iconColor: "black",
    },
};

export const darkMode: Theme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        headerColor: "white",
        iconColor: "black",
    },
};
