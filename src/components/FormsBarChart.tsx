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


const FormsBarChart = ({ sentimentPercentages }: { sentimentPercentages: any }) => {
  const labels = ['Positive', 'Neutral', 'Negative'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Sentiments Distribution',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
          // Label for bars
          label: "total count/value",
          // Data value of each variable
          data:[sentimentPercentages.positive, sentimentPercentages.neutral, sentimentPercentages.negative],
          backgroundColor: ["rgba(0, 233, 75, 0.8)", "rgba(255, 214, 81, 0.8)", "rgba(247, 14, 0, 0.8)"],
          borderColor: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0,1)", "rgba(0, 0, 0, 1)"],
          borderWidth: 0.5,
      },
  ],
  };
  
  return <Bar options={options} data={data} className='mb-6'/>;
};


export default FormsBarChart;
