import { Box, Container } from "@mui/material";
import DoughnutChart from "../components/fragments/DoghnutChart";
import { useFinance } from "../context/TransactionContext";
import colors from "../styles/colors";
import ReminderCalendar from "../components/fragments/ReminderCalendar";
import LineChart from "../components/fragments/LineChart";
import BalanceCard from "../components/fragments/BalanceCard";
import TransactionCard from "../components/fragments/TransactionCard";

const DashboardPage: React.FC = () => {
  const {
    transactions,
    getEntries,
    getExpenses,
  } = useFinance();

  const originalEntries = getEntries();
  const originalExpenses = getExpenses();

  const entriesValues = originalEntries.map((entry) => entry.value);
  const expensesValues = originalExpenses.map((expense) => expense.value);

  const latestEntries = originalEntries.slice(-10) || [];
  const latestExpenses = originalExpenses.slice(-10) || [];

  return (
    <Container
      sx={{
        display: "flex ",
        width: "95dvw",
        justifyContent: "space-evenly",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ height: "240px", width: "95%", overflowY: "auto" }}
          bgcolor={colors.common[900]}
        >
          <TransactionCard transactions={transactions} />
        </Box>

        <Box
          sx={{ height: "310px", width: "95%", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
          bgcolor={colors.common[900]}
        >
          <ReminderCalendar formDisplay="none"/>
        </Box>
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {/* <BarChart incomes={latestEntries} expenses={latestExpenses} /> */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "240px", width: "95%" }}
          bgcolor={colors.common[900]}
          p={1}
        >
          <DoughnutChart incomes={entriesValues} expenses={expensesValues} />

          <BalanceCard />
        </Box>

        <Box
          sx={{ height: "310px", width: "95%" }}
          bgcolor={colors.common[900]}
        >
          <LineChart incomes={latestEntries} expenses={latestExpenses} />
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
