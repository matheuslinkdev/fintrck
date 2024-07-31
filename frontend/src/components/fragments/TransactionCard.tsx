import { Box, List, ListItem } from "@mui/material";
import React from "react";
import colors from "../../styles/colors";

const TransactionCard = ({ transactions }) => {
  return (
    <Box width={800} maxWidth="95dvw">
      <List>
        {transactions.map((transaction) => {
          return (
            <ListItem
              sx={{
                textDecoration: "none",
                width: "500px",
                height: "150px",
                p: 4,
                bgcolor: colors.common[300],
                borderLeft: `5px solid ${
                  transaction.transactionType === "income" ? "green" : "red"
                }`,
              }}
            >
              {transaction?.label} - {transaction?.value}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TransactionCard;
