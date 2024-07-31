import { Box, List, ListItem, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const TransactionCard = ({ transactions }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {transactions.map((transaction) => {
        return (
          <div
            onClick={() => navigate(`/transactions/${transaction._id}`)}
            style={{ cursor: "pointer" }}
          >
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
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
              >
                <Box>
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
                <Typography
                  alignSelf="end"
                  justifySelf="end"
                  fontSize={14}
                  fontWeight={600}
                >
                  {formatDate(transaction.date)}
                </Typography>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};

export default TransactionCard;
