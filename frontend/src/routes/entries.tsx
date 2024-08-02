import React, { useState, useEffect } from "react";
import { useFinance } from "../context/TransactionContext";
import TransactionCard from "../components/fragments/TransactionCard";


const EntriesPage = () => {

  const { getEntries, transactions } = useFinance();
  useEffect(()=>{

  }, [transactions])


  const entries = getEntries()


  return (
    <div>
      <TransactionCard transactions={entries}/>
    </div>
  );
};

export default EntriesPage;
