
import { Box } from "@mui/material";
import BarChart from "../components/fragments/BarChart";
import DoughnutChart from "../components/fragments/DoghnutChart";
import { useFinance } from "../context/TransactionContext";
import colors from "../styles/colors";

const DashboardPage: React.FC = () => {
  const { getEntries, getExpenses } = useFinance();

  const originalEntries = getEntries();
  const originalExpenses = getExpenses();

  const entriesValues = originalEntries?.map((entry) => entry.value);
  const expensesValues = originalExpenses?.map((expense) => expense.value);

  const latestEntries = originalEntries.slice(-10) || [];
  const latestExpenses = originalExpenses.slice(-10) || [];

  return (
    <div>
      DashboardPage
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 2,
          bgcolor: colors.common[200],
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: "100%",
            minWidth: 0,
          }}
        >
        <BarChart incomes={latestEntries} expenses={latestExpenses} />
        </Box>
        <Box
          sx={{
            flex: 1,
            maxWidth: "100%",
            minWidth: 0,
          }}
        >
          <DoughnutChart incomes={entriesValues} expenses={expensesValues} />
        </Box>
      </Box>
    </div>
  );
};

export default DashboardPage;
