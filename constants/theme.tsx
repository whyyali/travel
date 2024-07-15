import { Dimensions } from "react-native";

const {height, width} = Dimensions.get("window");

export const COLORS = {
    red: "#eb6a58",
    green: "#449282",
    blue: "#4267b2",
    white: "#fbfbfb",
    lightRed: "#eb9c98",
    lightGreen: "#73ada1",
    lightBlue: "#6885c1",
    lightWhite: "#ffffff",
    black: "#121212",
    dark: "#3d3a45",
    gray: "#8c8896",
    lightGray: "#d1cfd5",
}

export const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    width: width,
    height: height,
}

export const TEXT = {
    xxSmall: 11,
    xSmall: 13,
    small: 15,
    medium: 17,
    large: 21,
    xLarge: 27,
    xxLarge: 32,
}