import { Box, Container } from "@mui/material";
import DoughnutChart from "../components/fragments/DoghnutChart";
import { useFinance } from "../context/TransactionContext";
import colors from "../styles/colors";
import ReminderCalendar from "../components/fragments/ReminderCalendar";
import LineChart from "../components/fragments/LineChart";
import BalanceCard from "../components/fragments/BalanceCard";
import TransactionCard from "../components/fragments/TransactionCard";
import { useEffect, useState } from "react";
import { fetchAllTransactions } from "../api/fetch";
import { TransactionProps } from "../types/globalTypes";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [entries, setEntries] = useState<TransactionProps[]>([]);
  const [expenses, setExpenses] = useState<TransactionProps[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchAllTransactions();
        setTransactions(response);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const sortedTransactions = transactions
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setEntries(
      sortedTransactions.filter((t) => t.transactionType === "income")
    );
    setExpenses(
      sortedTransactions.filter((t) => t.transactionType === "expense")
    );
  }, [transactions]);

  const entriesValues = entries.map((entry) => entry.value);
  const expensesValues = expenses.map((expense) => expense.value);

  const latestEntries = entries.slice(-10) || [];
  const latestExpenses = expenses.slice(-10) || [];

  return (
    <Container
      sx={{
        display: "flex",
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
          <TransactionCard transactions={transactions} deleteDisplay="none"/>
        </Box>

        <Box
          sx={{
            height: "310px",
            width: "95%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
          bgcolor={colors.common[900]}
        >
          <ReminderCalendar formDisplay="none" />
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
