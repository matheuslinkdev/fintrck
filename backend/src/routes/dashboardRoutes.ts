import { Router } from "express";
import { entriesList, expensesList, getTransactions } from "../controllers/dashboardController";

const router = Router();

router.route("/").get(getTransactions);
router.route("/expenses").get(expensesList)
router.route("/entries").get(entriesList)
router.route("/important").get(entriesList)

export default router;