import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleTransaction } from "../api/fetch";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSingleTransaction(id);
        setTransaction(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return <div>Details of transaction: {id}</div>;
};

export default TransactionDetails;
