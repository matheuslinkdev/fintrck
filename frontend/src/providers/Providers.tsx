import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { FinanceProvider } from "../context/TransactionContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <FinanceProvider>{children}</FinanceProvider>
    </ThemeProvider>
  );
};

export default Providers;
