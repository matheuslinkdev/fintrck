import { Box, Container, Typography } from "@mui/material";
import BarChart from "../components/fragments/BarChart";
import DoughnutChart from "../components/fragments/DoghnutChart";
import { useFinance } from "../context/TransactionContext";
import colors from "../styles/colors";
import ReminderCalendar from "../components/fragments/ReminderCalendar";
import { formatToBRL } from "../utils/formatValue";
import LineChart from "../components/fragments/LineChart";
import BalanceCard from "../components/fragments/BalanceCard";

const DashboardPage: React.FC = () => {
  const { getEntries, getExpenses, balanceSum, totalEntries, totalExpenses } =
    useFinance();

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
      <Box flex={1}>
        <Box bgcolor={colors.common[800]} width={300}>
          <Typography variant="h3" fontSize={26}>
            Saldo: {balanceSum()}
          </Typography>
          <Typography variant="h3" fontSize={18}>
            Entradas: {formatToBRL(totalEntries)}
          </Typography>
          <Typography variant="h3" fontSize={18}>
            Saídas: {formatToBRL(totalExpenses)}
          </Typography>
        </Box>
        <ReminderCalendar />
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
          sx={{ height: "240px", width: "100%" }}
          bgcolor={colors.common[900]}
          p={1}
        >
          <DoughnutChart incomes={entriesValues} expenses={expensesValues} />

          <Box>
            <BalanceCard/>
          </Box>
        </Box>

        <Box
          sx={{ height: "310px", width: "600px" }}
          bgcolor={colors.common[900]}
        >
          <LineChart incomes={latestEntries} expenses={latestExpenses} />
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
