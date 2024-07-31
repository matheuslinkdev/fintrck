import React from 'react'
import { useFinance } from '../context/TransactionContext'

const ImportantsPage = () => {

    const { getImportantTransactions } = useFinance()

    const importants = getImportantTransactions()

  return (
    <div>{importants?.map((transaction)=>{
        return(
            <li>
                {transaction.label}
            </li>
        )
    })}</div>
  )
}

export default ImportantsPage