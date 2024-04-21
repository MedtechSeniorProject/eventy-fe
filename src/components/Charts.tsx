import Chart from "react-apexcharts";

const Charts = ({...props}) => {

  // Change checkIn Data once we have the actual data
  const checkinData = props.checkinData;
  console.log(checkinData)

  if(checkinData.length === 0) {
    return <div className="w-full h-40 border border-gray-400 flex justify-center items-center">
      <div>No check-ins available</div>
    </div>
  }
  
  const groupedByMinute: any = {};
  checkinData.forEach((datetimeString: any) => {
    const minuteTimestamp = new Date(datetimeString).toISOString().slice(0, 17) + "00Z";
    groupedByMinute[minuteTimestamp] = groupedByMinute[minuteTimestamp] || { timestamp: minuteTimestamp, occurrences: 0 };
    groupedByMinute[minuteTimestamp].occurrences++;
  });

  const groupedData = Object.entries(groupedByMinute).map(([_, data]: any) => [new Date(data.timestamp).getTime(), data.occurrences]);
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

