import React, { useEffect, useState } from 'react'
import { fetchAllTransactions } from '../api/fetch';
import { List, ListItem } from '@mui/material';
import { useFinance } from '../context/TransactionContext';
import { Link } from 'react-router-dom';

const TransactionsPage = () => {

const { transactions } = useFinance()

  return (
    <div>TransactionsPage
      <List>
        {transactions?.map((transaction)=>{
          return(
            <Link to={`/transactions/${transaction?._id}`} key={transaction?._id}>
              {transaction?.label}
            </Link>
          )
        })}
      </List>
    </div>
  )
}

export default TransactionsPage