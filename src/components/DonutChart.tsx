import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const DonutChart = ({ ...props }) => {
  const data = Number(props.data) * 100;

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "donut",
    },
    legend: {
        show:false
    },
    dataLabels: {
      enabled: true,
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    theme: {
      mode: "light",
      palette: "palette6",
      monochrome: {
        enabled: true,
        color: "#F16E00",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  const series = [data, 100 - data];

  return <Chart series={series} options={options} type="donut" height={200} />;
};

export default DonutChart;
