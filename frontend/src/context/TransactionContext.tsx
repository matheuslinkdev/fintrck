import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchAllTransactions } from "../api/fetch";
import { formatToBRL } from "../utils/formatValue";

const FinanceContext = createContext();

const API_URL = "http://localhost:3333";

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchAllTransactions();
        setTransactions(response);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post(`${API_URL}/dash`, transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/dash/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const response = await axios.put(
        `${API_URL}/dash/transactions/${id}`,
        updatedTransaction
      );
      setTransactions(
        transactions.map((transaction) =>
          transaction._id === id ? response.data : transaction
        )
      );
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  // Função para ordenar as transações por data (de menor para maior)
  const sortTransactionsByDate = (trans) =>
    trans.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

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

  const calculateSum = (items) =>
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
        loading,
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
