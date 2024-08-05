import React, { useState, useEffect } from "react";
import { useFinance } from "../context/TransactionContext";
import TransactionCard from "../components/fragments/TransactionCard";
import { Box, CircularProgress, Container } from "@mui/material";
import { TransactionProps } from "../types/globalTypes";

const EntriesPage = () => {
  const [entriesList, setEntriesList] = useState<TransactionProps[]>([]);
  const { getEntries, transactions } = useFinance();
  useEffect(() => {}, [transactions]);

  setTimeout(() => {
    const entries = getEntries();
    setEntriesList(entries);
  }, 2000);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
      }}
    >
      {entriesList.length > 0 ? (
        <TransactionCard deleteDisplay="block" transactions={entriesList} />
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default EntriesPage;
