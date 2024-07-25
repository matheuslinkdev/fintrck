import React from 'react'
import { useParams } from 'react-router-dom';

const EntryDetails = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <div>EntryDetails: {id}</div>
  )
}

export default EntryDetails