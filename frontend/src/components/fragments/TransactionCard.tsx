import { Box, List, ListItem, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";

const TransactionCard = ({ transactions }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {transactions.map((transaction) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              borderBottom: "1px solid #656565",
              textDecoration: "none",
              width: "300px",
              height: "70px",
              p: 2,
              bgcolor: colors.common[700],
              borderLeft: `5px solid ${
                transaction.transactionType === "income"
                  ? colors.green[500]
                  : colors.red[600]
              }`,
              borderRight: `5px solid ${
                transaction.isImportant ? colors.blue[500] : "none"
              }`,
            }}
          >
            <Box alignItems="center">
              <Typography fontWeight={600}>{transaction?.label}</Typography>
              <Typography
                fontWeight={600}
                color={
                  transaction.transactionType === "income"
                    ? colors.green[500]
                    : colors.red[500]
                }
              >
                {formatToBRL(transaction?.value)}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TransactionCard;
