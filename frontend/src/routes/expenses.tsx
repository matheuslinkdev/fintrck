import React from "react";
import { useFinance } from "../context/TransactionContext";
import TransactionCard from "../components/fragments/TransactionCard";

const ExpensesPage = () => {
  const { getExpenses } = useFinance();

  const expenses = getExpenses();

  return (
    <div>
      <TransactionCard transactions={expenses} />
    </div>
  );
};

export default ExpensesPage;
