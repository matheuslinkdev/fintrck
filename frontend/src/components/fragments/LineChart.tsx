import {
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ReactChart } from "chartjs-react";

// Registre os módulos necessários para o gráfico
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale, 
  LinearScale
);

interface LineChartProps {
  entries: number[];
  expenses: number[];
}

const LineChart: React.FC<LineChartProps> = ({ entries, expenses }) => {
  const labels = entries.map((_, index) => `Month ${index + 1}`);

  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Incomes",
        data: entries,
        borderColor: "#00b806",
        backgroundColor: "rgba(0, 184, 6, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: expenses,
        borderColor: "#ff2a00",
        backgroundColor: "rgba(255, 42, 0, 0.2)",
        fill: true, // Para preencher a área abaixo da linha
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    animation: {
      duration: 0, // Desabilitar animação
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  return <ReactChart type="line" data={data} options={options} height={400} />;
};

export default LineChart;
