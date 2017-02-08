import React from 'react';
import { Doughnut } from 'react-chartjs-2';

/**
 *  Chart functional component
 *    -> Displays a poll's graphical chart
 */
const Chart = props => {
  const data = props.data;

  // Create the template to store all of the data
  let chartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  // Update the necessary data (option, vote numbers, color) into the template
  data.forEach(item => {
    chartData.labels.push(item.option);
    chartData.datasets[0].data.push(item.votes);
    chartData.datasets[0].backgroundColor.push(item.color);
  });

  return <Doughnut data={chartData} />
};

export default Chart;