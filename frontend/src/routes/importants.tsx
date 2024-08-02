import React from 'react'
import { useFinance } from '../context/TransactionContext'
import TransactionCard from '../components/fragments/TransactionCard'

const ImportantsPage = () => {

    const { getImportantTransactions } = useFinance()

    const importants = getImportantTransactions()

  return (
    <div><TransactionCard transactions={importants}/></div>
  )
}

export default ImportantsPage