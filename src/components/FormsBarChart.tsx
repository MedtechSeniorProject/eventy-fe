//DUMMY PLCAEHOLDER DATA FOR TESTING

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Positive', 'Neutral', 'Negative'];

export const data = {
  labels,
  datasets: [
    {
        // Label for bars
        label: "total count/value",
        // Data or value of your each variable
        //@sahar to replace with nlk analysis data
        data: [ 88, 5, 15],
        // Color of each bar : TODO: move to contants file
        backgroundColor: ["rgba(155, 255, 145, 0.8)", "rgba(255, 226, 137, 0.8)", "rgba(255, 67, 50, 0.8)"],

        // Border color of each bar
        borderColor: ["rgba(155, 255, 145, 0.8)", "rgba(255, 226, 137, 0.8)", "rgba(255, 67, 50, 0.8)"],
        borderWidth: 0.5,
    },
],
};

export function FormsBarChart() {
  return <Bar options={options} data={data} />;
}
