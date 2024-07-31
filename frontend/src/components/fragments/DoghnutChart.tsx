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

  console.log(totalExpenses);

  const data = {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Financial Overview",
        data: [totalIncomes, totalExpenses],
        backgroundColor: ["#00b806", "#ff2a00"],
        hoverBackgroundColor: ["#008b05", "#cc1902"],
        borderColor: "#eeeeee44",
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
