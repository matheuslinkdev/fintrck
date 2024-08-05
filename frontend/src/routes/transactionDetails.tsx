import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleTransaction } from "../api/fetch";
import { Box, Container, Typography } from "@mui/material";
import { formatToBRL } from "../utils/formatValue";
import { formatDate } from "../utils/formatDate";
import { TransactionProps } from "../types/globalTypes";
import colors from "../styles/colors";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState<TransactionProps>();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSingleTransaction(id);
        setTransaction(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  console.log(transaction?.date);

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
      <Box
        sx={{
          bgcolor: colors.common[900],
          p: 4,
          border: `2px solid ${
            transaction?.transactionType === "income"
              ? colors.green[500]
              : colors.red[500]
          }`,
        }}
      >
        <Typography variant="h1" fontSize={26}>{transaction?.label}</Typography>
        <Typography variant="h2" fontSize={22} my={2}>
        <Typography>{formatToBRL(transaction?.value)}</Typography>
          {transaction?.transactionType === "income"
           ? "Entrada" : "Saída"}
        </Typography>
        <Typography>{transaction?.description}</Typography>
        <Typography>{transaction?.bank}</Typography>
        {transaction?.date && (
          <Typography>{formatDate(transaction.date)}</Typography>
        )}
      </Box>
    </Container>
  );
};

export default TransactionDetails;
