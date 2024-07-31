import React, { useState, useEffect } from "react";
import { useFinance } from "../context/TransactionContext";


const EntriesPage = () => {

  const { getEntries } = useFinance();

  const entries = getEntries()


  return (
    <div>
      <h2>Incomes</h2>
      <ul>
        {entries?.map((transaction) => (
          <li key={transaction._id}>
            {transaction.label} - ${transaction.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntriesPage;
