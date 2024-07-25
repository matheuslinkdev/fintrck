import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./routes/dashboard.tsx";
import TransactionsPage from "./routes/transactions.tsx";
import TransactionDetails from "./routes/transactionDetails.tsx";
import EntriesPage from "./routes/entries.tsx";
import ExpensesPage from "./routes/expenses.tsx";
import ExpenseDetails from "./routes/expenseDetails.tsx";
import EntryDetails from "./routes/entryDetails.tsx";
import Providers from "./providers/Providers.tsx";
import ImportantsPage from "./routes/importants.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        <Providers>
    <Router>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/importants" element={<ImportantsPage />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/expenses/:id" element={<ExpenseDetails />} />
          <Route path="/entries/:id" element={<EntryDetails />} />
      </Routes>
    </Router>
        </Providers>
  </React.StrictMode>
);
