import { Request, Response } from "express";

// Interface para a estrutura da transação
interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
}

// Função para gerar movimentações financeiras falsas
const generateFakeTransactions = (): Transaction[] => {
  return [
    {
      id: 1,
      description: "Compra no supermercado",
      amount: -50.0,
      date: "2024-07-20",
    },
    { id: 2, description: "Salário", amount: 1500.0, date: "2024-07-15" },
    {
      id: 3,
      description: "Assinatura Netflix",
      amount: -30.0,
      date: "2024-07-10",
    },
  ];
};

// Função para obter todas as transações
export const getTransactions = (req: Request, res: Response): void => {
  const transactions = generateFakeTransactions();

  if (transactions.length > 0) {
    res.json(transactions);
  } else {
    res.status(204).send(); // No Content
  }
};

// Função para obter despesas
export const expensesList = (req: Request, res: Response): void => {
  const transactions = generateFakeTransactions();
  const expenses = transactions.filter((transaction) => transaction.amount < 0);

  if (expenses.length > 0) {
    res.json(expenses);
  } else {
    res.status(204).send(); // No Content
  }
};

// Função para obter entradas
export const entriesList = (req: Request, res: Response): void => {
  const transactions = generateFakeTransactions();
  const entries = transactions.filter((transaction) => transaction.amount > 0);

  if (entries.length > 0) {
    res.json(entries);
  } else {
    res.status(204).send(); // No Content
  }
};
