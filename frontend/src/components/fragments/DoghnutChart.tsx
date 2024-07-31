import {
  BarController,
  ArcElement,
  Tooltip,
  Legend,
  Chart as ChartJS,
  DoughnutController,
} from "chart.js";
import { ReactChart } from "chartjs-react";
import { formatToBRL } from "../../utils/formatValue";
import { Box } from "@mui/material";
import colors from "../../styles/colors";

// Registre os módulos necessários para o gráfico
ChartJS.register(
  BarController,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController
);

interface DoughnutChartProps {
  incomes: number[];
  expenses: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ incomes, expenses }) => {
  // Calcula os totais de incomes e expenses
  const totalIncomes = incomes.reduce((acc, cur) => acc + cur, 0);
  const totalExpenses = expenses.reduce((acc, cur) => acc - cur, 0);

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Financial Overview",
        data: [totalIncomes, totalExpenses],
        backgroundColor: [colors.green[500], colors.red[600]],
        hoverBackgroundColor: [colors.green[600], colors.red[700]],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${formatToBRL(value)}`;
          },
        },
      },
    },
    animation: {
      duration: 0, // Desabilitar animação
    },
  };

  return (
    <>
      <ReactChart type="doughnut" data={data} options={options} />
    </>
  );
};

export default DoughnutChart;
