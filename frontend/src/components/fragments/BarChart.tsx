import { Box } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Chart as ChartJS,
  BarController,
} from "chart.js";
import { ReactChart } from "chartjs-react";
import colors from "../../styles/colors";
import { formatDate } from "../../utils/formatDate";

// Registre os módulos necessários para o gráfico de barras
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController
);

interface Transaction {
  value: number;
  date: string; // Data no formato YYYY-MM-DD
}

interface BarChartProps {
  incomes: Transaction[];
  expenses: Transaction[];
}

const BarChart: React.FC<BarChartProps> = ({ incomes, expenses }) => {
  // Obter as últimas 10 transações ou todas, caso haja menos que 10
  const latestIncomes = incomes.slice(-10);
  const latestExpenses = expenses.slice(-10);

  // Preparar os dados
  const labels = latestIncomes
    .concat(latestExpenses)
    .map((transaction) => formatDate(transaction.date));
  const incomeValues = latestIncomes.map((transaction) => transaction.value);
  const expenseValues = latestExpenses.map(
    (transaction) => -Math.abs(transaction.value)
  ); // Certifique-se de que as despesas sejam negativas

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Incomes",
        data: incomeValues,
        backgroundColor: "#00b806", // Cor de fundo das barras de receita
        borderColor: "#00b806", // Cor da borda das barras de receita
        borderWidth: 1, // Largura da borda das barras
      },
      {
        label: "Expenses",
        data: expenseValues,
        backgroundColor: "#ff2a00", // Cor de fundo das barras de despesa
        borderColor: "#ff2a00", // Cor da borda das barras de despesa
        borderWidth: 1, // Largura da borda das barras
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: "#ffffff", // Cor do texto dos rótulos do eixo X
        },
      },
      y: {
        stacked: false,
        beginAtZero: true, // Iniciar o eixo Y a partir de 0
        ticks: {
          color: "#ffffff", // Cor do texto dos rótulos do eixo Y
          callback: function (value: number) {
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Desabilita a legenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
        backgroundColor: "#333333", // Cor do fundo do tooltip
        titleColor: "#ffffff", // Cor do título do tooltip
        bodyColor: "#ffffff", // Cor do texto do corpo do tooltip
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <Box sx={{ height: "300px", width: "500px" }} bgcolor={colors.common[800]}>
      <ReactChart type="bar" data={data} options={options} height={400} />
    </Box>
  );
};

export default BarChart;
