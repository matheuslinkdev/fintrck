import React, { useState } from "react";
import { useFinance } from "../context/TransactionContext";
import TransactionCard from "../components/fragments/TransactionCard";
import { Box, CircularProgress, Container } from "@mui/material";
import { TransactionProps } from "../types/globalTypes";

const ExpensesPage = () => {
  const [expenseList, setExpenseList] = useState<TransactionProps[]>([])
  const { getExpenses } = useFinance();

  setTimeout(() => {
    const expenses = getExpenses();
    setExpenseList(expenses)
  }, 2000);

  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh"}}>
      {expenseList.length > 0 ? (
        <TransactionCard deleteDisplay="block" transactions={expenseList} />
      ) : (
        <Box>
          <CircularProgress/>
        </Box>
      )}
    </Container>
  );
};

export default ExpensesPage;
