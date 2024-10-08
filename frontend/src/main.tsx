import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsPage from "./routes/transactions.tsx";
import TransactionDetails from "./routes/transactionDetails.tsx";
import EntriesPage from "./routes/entries.tsx";
import ExpensesPage from "./routes/expenses.tsx";
import Providers from "./providers/Providers.tsx";
import ImportantsPage from "./routes/importants.tsx";
import Navbar from "./components/common/Navbar.tsx";
import AddPage from "./routes/add.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <main>
        <Router>
        <Navbar/>
   
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/entries" element={<EntriesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/importants" element={<ImportantsPage />} />
            <Route path="/transactions/:id" element={<TransactionDetails />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </Router>
      </main>
    </Providers>
  </React.StrictMode>
);
