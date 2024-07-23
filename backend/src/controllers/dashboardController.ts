import { Request, Response } from "express";
import { TransactionModel } from "../models/transactionModel";

// Função auxiliar para responder com transações filtradas
const respondWithFilteredTransactions = async (
  filter: any,
  res: Response
): Promise<void> => {
  try {
    const transactions = await TransactionModel.find(filter);
    res.status(transactions.length ? 200 : 204).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter transações", error });
  }
};

// Função para obter todas as transações
export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  await respondWithFilteredTransactions({}, res);
};

export const getTransactionByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id) {
      res.status(400).json({ message: "ID da transação não fornecido" });
      return;
    }

    // Buscar a transação com o ID fornecido
    const transaction = await TransactionModel.findById(id);

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transação não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter a transação", error });
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id) {
      res.status(400).json({ message: "ID da transação não fornecido" });
      return;
    }

    // Buscar e atualizar a transação com o ID fornecido
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedTransaction) {
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transação não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a transação", error });
  }
};

// Função para obter despesas
export const expensesList = async (
  req: Request,
  res: Response
): Promise<void> => {
  await respondWithFilteredTransactions({ transactionType: "expense" }, res);
};

// Função para obter entradas
export const entriesList = async (
  req: Request,
  res: Response
): Promise<void> => {
  await respondWithFilteredTransactions({ transactionType: "income" }, res);
};

// Função para obter transações importantes
export const importantList = async (
  req: Request,
  res: Response
): Promise<void> => {
  await respondWithFilteredTransactions({ isImportant: true }, res);
};

// Função para criar uma nova transação
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a transação", error });
  }
};

export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id) {
      res.status(400).json({ message: "ID da transação não fornecido" });
      return;
    }

    // Deletar a transação com o ID fornecido
    const deletedTransaction = await TransactionModel.findByIdAndDelete(id);

    if (deletedTransaction) {
      res.status(200).json({ message: "Transação deletada com sucesso" });
    } else {
      res.status(404).json({ message: "Transação não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar a transação", error });
  }
};
