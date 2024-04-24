import Chart from "react-apexcharts";

const Charts = ({...props}) => {

  // Change checkIn Data once we have the actual data
  let checkinData = props.checkinData;
  checkinData = checkinData.sort()
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
  const series = [{
    name: "Number Of Attendees",
    data: 
      groupedData.map((data) => data)
  }]

  function calculateMax(data: any){
    if(data.length === 0){
      return;
    }
    let length = 0
    data.map((element: any) => {
      length = Math.max(length, element.length)
    })
    return length
  }

  const options: any = {
    chart: {
      id: 'area-datetime',
      height: 350,},
    yaxis: {
      show: true,
      min: 0,
      max: calculateMax(groupedData),
      seriesName: "Number of Attendees",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true
      },
      title: {
        text: "Number of Attendees",
      },
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
      title: {
        text: "Time"
      }
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
    }
  };

  return <Chart series={series} options={options} type="area" height={350} />;
};

export default Charts;

