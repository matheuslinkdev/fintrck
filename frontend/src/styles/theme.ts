
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        "#root": {
          width: "100vw",
          maxWidth: "100vw",
        },
      },
    },
  },
});

export default theme;
