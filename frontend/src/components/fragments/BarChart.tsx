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

// Função para formatar a data para o formato DD/MM/YYYY
const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

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
        backgroundColor: "#00b806",
        borderColor: "#00b806",
      },
      {
        label: "Expenses",
        data: expenseValues,
        backgroundColor: "#ff2a00",
        borderColor: "#ff2a00",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true, // Iniciar o eixo Y a partir de 0
        ticks: {
          callback: function (value) {
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    animation: {
      duration: 0, // Desabilitar animação
    },
  };

  return <ReactChart type="bar" data={data} options={options} height={400} />;
};

export default BarChart;
