import { useParams } from 'react-router-dom';

const TransactionDetails = () => {

  const { id } = useParams<{ id?: string }>();

  return (
    <div>Details of transaction: {id}</div>
  )
}

export default TransactionDetails