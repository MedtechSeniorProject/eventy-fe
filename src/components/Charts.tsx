import Chart from "react-apexcharts";

const Charts = ({...props}) => {

  // Change checkIn Data once we have the actual data
  const checkinData = [
    "2022-01-01T08:00:00.000Z",
    "2022-01-01T08:00:00.100Z",
    "2022-01-01T08:01:00.000Z",
    "2022-01-01T08:02:00.000Z",
    "2022-01-01T08:02:30.000Z",
    // Additional entries below
    "2022-01-01T08:03:00.000Z",
    "2022-01-01T08:03:30.000Z",
    "2022-01-01T08:04:00.000Z",
    "2022-01-01T08:05:00.000Z",
    "2022-01-01T08:06:00.000Z",
    "2022-01-01T08:06:30.000Z",
    "2022-01-01T08:07:00.000Z",
    "2022-01-01T08:08:00.000Z",
    "2022-01-01T08:08:30.000Z",
    "2022-01-01T08:09:00.000Z",
    "2022-01-01T08:10:00.000Z",
    "2022-01-01T08:11:00.000Z",
    "2022-01-01T08:11:30.000Z",
    "2022-01-01T08:12:00.000Z",
    "2022-01-01T08:13:00.000Z",
    "2022-01-01T08:14:00.000Z",
    "2022-01-01T08:14:30.000Z",
    "2022-01-01T08:15:00.000Z",
    "2022-01-01T08:16:00.000Z",
    "2022-01-01T08:17:00.000Z",
    "2022-01-01T08:17:30.000Z",
    "2022-01-01T08:18:00.000Z",
    "2022-01-01T08:19:00.000Z",
    "2022-01-01T08:20:00.000Z",
    "2022-01-01T08:20:30.000Z",
    "2022-01-01T08:21:00.000Z",
    "2022-01-01T08:22:00.000Z",
    "2022-01-01T08:23:00.000Z",
    "2022-01-01T08:23:30.000Z",
    "2022-01-01T08:24:00.000Z",
    "2022-01-01T08:25:00.000Z",
    "2022-01-01T08:26:00.000Z",
    "2022-01-01T08:26:30.000Z",
  ];

  if(checkinData.length === 0) {
    return <div className="w-full h-40 border border-gray-400 flex justify-center items-center">
      <div>No check-ins available</div>
    </div>
  }
  
  const groupedByMinute: any = {};
  checkinData.forEach((datetimeString) => {
    const minuteTimestamp = new Date(datetimeString).toISOString().slice(0, 17) + "00Z";
    groupedByMinute[minuteTimestamp] = groupedByMinute[minuteTimestamp] || { timestamp: minuteTimestamp, occurrences: 0 };
    groupedByMinute[minuteTimestamp].occurrences++;
  });

  const groupedData = Object.entries(groupedByMinute).map(([timestamp, data]: any) => [new Date(data.timestamp).getTime(), data.occurrences]);
  console.log(groupedData)
  const series = [{
    data: 
      groupedData.map((data) => data)
    
  }]

  const options: any = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }},
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    colors: ['#000000'],
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
  };

  return <Chart series={series} options={options} type="area" height={350} />;
};

export default Charts;

