import React from 'react'
import { useParams } from 'react-router-dom';

const ExpenseDetails = () => {
      const { id } = useParams<{ id?: string }>();
  return (
    <div>ExpenseDetails: {id}</div>
  )
}

export default ExpenseDetails