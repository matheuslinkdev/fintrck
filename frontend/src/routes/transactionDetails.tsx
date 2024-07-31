import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleTransaction } from "../api/fetch";
import { Box, Typography } from "@mui/material";
import { formatToBRL } from "../utils/formatValue";
import { formatDate } from "../utils/formatDate";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState();

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
    <div>
      <Box>
        <Typography variant="h5">{transaction?.label}</Typography>
        <Typography variant="h5">
          {transaction?.transactionType === "income" ? "Entrada" : "Saída"}
        </Typography>
        <Typography>{transaction?.description}</Typography>
        <Typography>{formatToBRL(transaction?.value)}</Typography>
        <Typography>{transaction?.bank}</Typography>
        {transaction?.date && (
          <Typography>{formatDate(transaction.date)}</Typography>
        )}
      </Box>
    </div>
  );
};

export default TransactionDetails;
