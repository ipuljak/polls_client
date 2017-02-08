import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = props => {
  const data = props.data;
  console.log(data);

  let chartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  data.forEach(item => {
    chartData.labels.push(item.option);
    chartData.datasets[0].data.push(item.votes);
    chartData.datasets[0].backgroundColor.push(item.color);
  });

  return <Doughnut data={chartData} />
};

export default Chart;