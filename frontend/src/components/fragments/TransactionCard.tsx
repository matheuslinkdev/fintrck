import { Box, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { TransactionProps } from "../../types/globalTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFinance } from "../../context/TransactionContext";
import { useEffect } from "react";

const TransactionCard = ({ transactions }: TransactionProps[]) => {
  const navigate = useNavigate();
  const { deleteTransaction } = useFinance();

    useEffect(() => {
      console.log("Transaction Updated", transactions);
    }, [transactions]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {transactions.map((transaction: TransactionProps) => {
        return (
          <Box
            onClick={() => navigate(`/transactions/${transaction._id}`)}
            sx={{ cursor: "pointer", position: "relative" }}
            key={transaction._id}
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
              <Box
                bgcolor="red"
                position="absolute"
                top={2}
                right={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation(); // Evita a propagação do clique para o card
                    deleteTransaction(transaction._id);
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TransactionCard;
