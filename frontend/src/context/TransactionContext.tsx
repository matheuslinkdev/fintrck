import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { fetchAllTransactions } from "../api/fetch";
import { formatToBRL } from "../utils/formatValue";
import { TransactionProps } from "../types/globalTypes";

interface FinanceContextProps {
  transactions: TransactionProps[];
  addTransaction: (transaction: TransactionProps) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (
    id: string,
    updatedTransaction: TransactionProps
  ) => Promise<void>;
  getEntries: () => TransactionProps[];
  getExpenses: () => TransactionProps[];
  getImportantTransactions: () => TransactionProps[];
  balanceSum: () => string;
  totalEntries: number;
  totalExpenses: number;
}

const API_URL = "http://localhost:3333";

const FinanceContext = createContext<FinanceContextProps | null>(null);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchAllTransactions();
        setTransactions(response);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (transaction: TransactionProps) => {
    try {
      const response = await axios.post(`${API_URL}/dash`, transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const deleteTransaction =  (id: string) => {
    try {
      axios.delete(`${API_URL}/dash/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const updateTransaction = async (
    id: string,
    updatedTransaction: TransactionProps
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/dash/transactions/${id}`,
        updatedTransaction
      );
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === id ? response.data : transaction
        )
      );
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const sortTransactionsByDate = (trans: TransactionProps[]) =>
    trans
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEntries = () =>
    sortTransactionsByDate(
      transactions.filter((t) => t.transactionType === "income")
    );

  const getExpenses = () =>
    sortTransactionsByDate(
      transactions.filter((t) => t.transactionType === "expense")
    );

  const getImportantTransactions = () =>
    sortTransactionsByDate(transactions.filter((t) => t.isImportant));

  const calculateSum = (items: TransactionProps[]) =>
    items.reduce((sum, item) => sum + (item.value || 0), 0);

  const totalEntries = calculateSum(getEntries());
  const totalExpenses = calculateSum(getExpenses());

  const balanceSum = () => {
    const totalBalance = totalEntries - totalExpenses;
    return formatToBRL(totalBalance);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        getEntries,
        getExpenses,
        getImportantTransactions,
        balanceSum,
        totalEntries,
        totalExpenses,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
