import { Box, Typography } from "@mui/material";
import colors from "../../styles/colors";
import { formatToBRL } from "../../utils/formatValue";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { TransactionProps } from "../../types/globalTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFinance } from "../../context/TransactionContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TransactionCardProps {
  deleteDisplay: string;
  transactions: TransactionProps[];
}

const TransactionCard = ({
  deleteDisplay,
  transactions,
}: TransactionCardProps) => {
  const navigate = useNavigate();
  const { deleteTransaction } = useFinance();

  const handleDelete = (id: string) => {
    toast.success("Transação removida com sucesso !");
    deleteTransaction(id);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {transactions.map((transaction) => (
        <Box
          onClick={() => navigate(`/transactions/${transaction._id}`)}
          sx={{ position: "relative" }}
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
              position: "relative",
              bgcolor: colors.common[700],
              borderLeft: `5px solid ${
                transaction.transactionType === "income"
                  ? colors.green[500]
                  : colors.red[600]
              }`,
              borderRight: `5px solid ${
                transaction.isImportant ? colors.blue[500] : "none"
              }`,
              "&:hover": {
                bgcolor: colors.common[800],
                borderBottom: `1px solid ${
                  transaction.transactionType === "income"
                    ? colors.green[500]
                    : colors.red[600]
                }`,
              },
            }}
          >
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography fontWeight={600}>{transaction.label}</Typography>
                <Typography
                  fontWeight={600}
                  color={
                    transaction.transactionType === "income"
                      ? colors.green[500]
                      : colors.red[400]
                  }
                >
                  {formatToBRL(transaction.value)}
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

              position="absolute"
              top={2}
              right={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ display: deleteDisplay }}
            >
              <DeleteIcon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(transaction._id);
                }}
                sx={{
                  cursor: "pointer",
                  filter: `drop-shadow(0 0 2px ${colors.red[500]})`,
                  "&:hover": {
                    filter: `drop-shadow(0 0 8px ${colors.red[400]})`,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}
      <ToastContainer autoClose={300} />
    </Box>
  );
};

export default TransactionCard;
