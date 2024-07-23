import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  entriesList,
  expensesList,
  getTransactions,
  importantList,
  getTransactionByID,
  updateTransaction,
} from "../controllers/dashboardController";

const router = Router();

router.route("/").get(getTransactions).post(createTransaction);
router.route("/expenses").get(expensesList);
router.route("/entries").get(entriesList);
router.route("/important").get(importantList);
router.route("/transactions").get(getTransactions);
router
  .route("/transactions/:id")
  .get(getTransactionByID)
  .delete(deleteTransaction)
  .put(updateTransaction);

export default router; 
