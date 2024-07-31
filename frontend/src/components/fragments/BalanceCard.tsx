import React from "react";
import { useFinance } from "../../context/TransactionContext";
import { Box, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";

const BalanceCard = () => {
  const { balanceSum, totalEntries, totalExpenses } = useFinance();


  const entriesFormatted = formatToBRL(totalEntries);
  const expensesFormatted = formatToBRL(totalExpenses);
  const balanceFormatted = formatToBRL(totalEntries - totalExpenses);

  // Converta o valor para comparações
  const balanceValue = totalEntries - totalExpenses;
  const entriesValue = totalEntries;
  const expensesValue = totalExpenses;

  return (
    <Box bgcolor={colors.common[800]} width={300}>
      <Typography variant="h3" fontSize={26}>
        Saldo:
        <Typography color={balanceValue >= 0 ? "green" : "red"}>
          {balanceFormatted}
        </Typography>
      </Typography>
      <Typography variant="h3" fontSize={18}>
        Entradas:
        <Typography color={entriesValue >= 0 ? "green" : "red"}>
          {entriesFormatted}
        </Typography>
      </Typography>
      <Typography variant="h3" fontSize={18}>
        Saídas:{" "}
        <Typography color={expensesValue < 0 ? "green" : "red"}>
          {expensesFormatted}
        </Typography>
      </Typography>
    </Box>
  );
};

export default BalanceCard;
