import React, { useEffect, useState } from 'react'
import { fetchAllTransactions } from '../api/fetch';
import { List, ListItem } from '@mui/material';
import { useFinance } from '../context/TransactionContext';

const TransactionsPage = () => {

const { transactions } = useFinance()

console.log(transactions)

  return (
    <div>TransactionsPage
      <List>
        {transactions?.map((transaction)=>{
          return(
            <ListItem key={transaction?._id}>
              {transaction?.label}
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default TransactionsPage