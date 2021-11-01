import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

export const themeColors = {
  //primary: "rgb(0, 183, 197)",
  primary: "rgb(221, 173, 120)",
  primaryDark: "rgb(184, 128, 67)",
  //primaryDark: "rgb(0, 149, 157)",
  sidebar: {
    primary: "#37474f",
    fontColor: "white",
    menuHover: "#a64b6dd9",
    menuSelected: "#a53860f0",
  },
  table: {
    header: "#f5f5f5",
  },
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: themeColors.primary,
      dark: themeColors.primaryDark,
    },
  },
  typography: {
    fontSize: 14,
  },
  overrides: {
    MuiListItemText: {
      primary: {
        //color: "black",
        //fontWeight: "bold",
      },
      secondary: {
        //color: "silver",
      },
    },
    MuiListItem: {
      divider: {
        borderBottomColor: "gray",
      },
    },
    MuiButton: {
      label: {
        textTransform: "capitalize",
        //color: "white",
        fontWeight: "bold",
      },
    },
    MuiOutlinedInput: {
      root: {
        "& fieldset": {
          borderColor: themeColors.primary,
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: `${themeColors.primary} !important`,
        },
        borderColor: themeColors.primary,
        boxShadow: `0 0 8px 0 ${themeColors.primary}`,
      },
    },
  },
});
