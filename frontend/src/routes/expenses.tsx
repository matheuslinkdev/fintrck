import React from "react";
import { useFinance } from "../context/TransactionContext";

const ExpensesPage = () => {
  const { getExpenses } = useFinance();

  const expenses = getExpenses();

  console.log(expenses);

  return <div>{expenses?.map((transaction)=>{
    return(
      <li>{transaction?.label}</li>
    )
  })}</div>;
};

export default ExpensesPage;
