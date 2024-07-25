import React, { useState, useEffect } from "react";
import { useFinance } from "../context/TransactionContext";


const EntriesPage = () => {
  const [incomes, setIncomes] = useState([]);

  const { transactions } = useFinance();

  useEffect(() => {
    const justIncomes = transactions.filter(
      (transaction) => transaction.transactionType === "expense"
    );
    setIncomes(justIncomes);
  }, [transactions]); // Dependência de transactions para atualizar apenas quando transactions mudar

  console.log(incomes);

  return (
    <div>
      <h2>Incomes</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income._id}>
            {income.label} - ${income.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntriesPage;
