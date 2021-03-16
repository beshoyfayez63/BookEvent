import { Bar } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const BOOKINGS_BUCKETS = {
  Cheap: { min: 0, max: 100 },
  Normal: { min: 100, max: 200 },
  Expensive: { min: 200, max: 10000000000 },
};

function Chart(props) {
  const data = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: ['#E4D9F8', '#D6ECFB', '#DBF3F3'],
        borderColor: ['#E4D9F8', '#D6ECFB', '#DBF3F3'],
        borderWidth: 1,
      },
    ],
  };
  for (let bucket in BOOKINGS_BUCKETS) {
    data.labels.push(bucket);
    const filteredBookings = props.bookings.reduce((prev, curr) => {
      if (
        curr.event.price < BOOKINGS_BUCKETS[bucket].max &&
        curr.event.price > BOOKINGS_BUCKETS[bucket].min
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    data.datasets[0].data.push(filteredBookings);
  }
  console.log(data.datasets[0].data);
  return <Bar data={data} options={options} />;
}

export default Chart;
