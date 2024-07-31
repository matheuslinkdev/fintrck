import { Box } from "@mui/material";
import {
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Chart as ChartJS,
  LineController,
  PointElement,
} from "chart.js";
import { ReactChart } from "chartjs-react";
import colors from "../../styles/colors";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  PointElement
);

interface Transaction {
  value: number;
  date: string; // Data no formato YYYY-MM-DD
}

interface LineChartProps {
  incomes: Transaction[];
  expenses: Transaction[];
}

// Função para formatar a data para o formato DD/MM/YYYY
const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const LineChart: React.FC<LineChartProps> = ({ incomes, expenses }) => {
  // Obter as últimas 10 transações ou todas, caso haja menos que 10
  const latestIncomes = incomes.slice(-10);
  const latestExpenses = expenses.slice(-10);

  const labels = latestIncomes
    .concat(latestExpenses)
    .map((transaction) => formatDate(transaction.date));
  const incomeValues = latestIncomes.map((transaction) => transaction.value);
  const expenseValues = latestExpenses.map(
    (transaction) => -Math.abs(transaction.value)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Incomes",
        data: incomeValues,
        borderColor: colors.green[400],
        backgroundColor: colors.green[500],
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Expenses",
        data: expenseValues,
        borderColor: colors.red[500],
        backgroundColor: colors.red[600],
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          callback: function (value) {
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
        backgroundColor: "#333333",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <>
      <ReactChart type="line" data={data} options={options} height={400} />
    </>
  );
};

export default LineChart;
