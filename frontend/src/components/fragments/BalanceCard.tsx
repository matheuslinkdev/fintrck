import React from "react";
import { useFinance } from "../../context/TransactionContext";
import { Box, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";

const BalanceCard = () => {
  const { totalEntries, totalExpenses } = useFinance();

  const entriesFormatted = formatToBRL(totalEntries);
  const expensesFormatted = formatToBRL(totalExpenses);
  const balanceFormatted = formatToBRL(totalEntries - totalExpenses);

  const balanceValue = totalEntries - totalExpenses;
  const entriesValue = totalEntries;
  const expensesValue = totalExpenses;

  return (
    <Box bgcolor={colors.common[800]} width={300} p={2}>
      <Typography variant="h3" fontSize={26} display="flex" alignItems="center">
        Saldo:
        <Typography
          color={balanceValue >= 0 ? colors.green[400] : colors.red[500]}
          fontSize={26}
          ml={1}
        >
          {balanceFormatted}
        </Typography>
      </Typography>

      <Typography variant="h3" fontSize={20} display="flex" alignItems="center" mt={2}>
        Entradas:
        <Typography
          color={entriesValue >= 0 ? colors.green[400] : colors.red[500]}
          ml={1}
          fontSize={20}
          fontWeight={500}
        >
          {entriesFormatted}
        </Typography>
      </Typography>

      <Typography variant="h3" fontSize={20} display="flex" alignItems="center">
        Saídas:{" "}
        <Typography
          color={expensesValue < 0 ? colors.green[400] : colors.red[500]}
          ml={1}
          fontSize={20}
          fontWeight={500}
        >
          {expensesFormatted}
        </Typography>
      </Typography>
    </Box>
  );
};

export default BalanceCard;
