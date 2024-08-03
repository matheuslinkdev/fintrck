import React, { useState } from "react";
import { useFinance } from "../context/TransactionContext";
import TransactionCard from "../components/fragments/TransactionCard";

const ExpensesPage = () => {
  const [expenseList, setExpenseList] = useState([])
  const { getExpenses } = useFinance();

  setTimeout(() => {
    const expenses = getExpenses();
    setExpenseList(expenses)
  }, 2000);

  return (
    <div>
      {expenseList.length > 0 ? (
        <TransactionCard deleteDisplay="block" transactions={expenseList} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ExpensesPage;
