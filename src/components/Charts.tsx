import Chart from "react-apexcharts";

const Charts = ({ ...props }) => {
  // Change checkIn Data once we have the actual data
  let checkinData = props.checkinData;
  checkinData = checkinData.sort();
  console.log(checkinData);

  if (checkinData.length === 0) {
    return (
      <div className="w-full h-40 border border-gray-400 flex justify-center items-center">
        <div>No check-ins available</div>
      </div>
    );
  }

  // sort the data by timestamp
  checkinData = checkinData.sort();

  const groupedByMinute: any = {};
  checkinData.forEach((datetimeString: any) => {
    const minuteTimestamp =
      new Date(Math.round(new Date(datetimeString).getTime() / 300000) * 300000)
        .toISOString()
        .slice(0, 17) + "00Z";
    groupedByMinute[minuteTimestamp] = groupedByMinute[minuteTimestamp] || {
      timestamp: minuteTimestamp,
      occurrences: 0,
    };
    groupedByMinute[minuteTimestamp].occurrences++;
  });

  // get last tinmestamp and timestamp minute and pad every minute in between with 0
  const firstTimestamp = new Date(checkinData[0]);
  const lastTimestamp = new Date(checkinData[checkinData.length - 1]);
  const firstMinuteTimestamp =
    new Date(Math.round(firstTimestamp.getTime() / 300000) * 300000 - 3600000)
      .toISOString()
      .slice(0, 17) + "00Z";

  const lastMinuteTimestamp =
    new Date(Math.round(lastTimestamp.getTime() / 300000) * 300000)
      .toISOString()
      .slice(0, 17) + "00Z";
  let currentMinuteTimestamp = firstMinuteTimestamp;
  while (
    new Date(currentMinuteTimestamp) <
    new Date(new Date(lastMinuteTimestamp).getTime() + 3600000)
  ) {
    currentMinuteTimestamp = new Date(
      new Date(currentMinuteTimestamp).getTime() + 300000
    ).toISOString();
    if (!groupedByMinute[currentMinuteTimestamp]) {
      groupedByMinute[currentMinuteTimestamp] = {
        timestamp: currentMinuteTimestamp,
        occurrences: 0,
      };
    }
  }

  const groupedData = Object.entries(groupedByMinute).map(([_, data]: any) => [
    new Date(data.timestamp).getTime(),
    data.occurrences,
  ]);
  const series = [
    {
      name: "Number Of Attendees",
      data: groupedData.map((data) => data),
    },
  ];

  function calculateMax(data: any) {
    if (data.length === 0) {
      return;
    }
    let length = 0;
    data.map((element: any) => {
      length = Math.max(length, element.length);
    });
    return Math.round(length * 1.75);
  }

  const options: any = {
    chart: {
      id: "area-datetime",
      height: 350,
    },
    yaxis: {
      show: true,
      min: 0,
      max: calculateMax(groupedData),
      seriesName: "Number of Attendees",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      title: {
        text: "Number of Attendees",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    colors: ["#f16e00"],
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
    },
    tooltip: {
      x: {
        format: "hh:mm TT dd MMM yyyy",
      },
    },
    fill: {
      type: "solid",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  return <Chart series={series} options={options} type="bar" height={350} />;
};

export default Charts;
