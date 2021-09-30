import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const round2Digits = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const chartOptions = {
  interaction: {
    mode: 'nearest',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      position: 'nearest',
      callbacks: {
        title: function (tooltipItems) {
          return tooltipItems.map(
            (tooltipItem) => `x = ${round2Digits(tooltipItem.parsed.x)}`
          );
        },
        label: function (tooltipItem) {
          return `f(x) = ${round2Digits(tooltipItem.parsed.y)}`;
        },
      },
      filter: (tooltip) => tooltip.datasetIndex > 1,
    },
  },
  scales: {
    x: {
      type: 'linear',
      display: true,
      title: {
        display: true,
        text: 'x',
      },
      grid: {
        drawBorder: false,
      },
    },
    y: {
      type: 'linear',
      display: true,
      title: {
        display: true,
        text: 'f(x)',
      },
      grid: {
        drawBorder: false,
      },
    },
  },
  spanGaps: false,
  animation: false,
  responsive: true,
  maintainAspectRatio: true,
};

const chartData = {
  datasets: [
    {
      label: 'x',
      data: [
        {
          x: 50,
          y: 0,
        },
        {
          x: -50,
          y: 0,
        },
      ],
      fill: false,
      animation: false,
      borderColor: '#FF7E67',
      borderWidth: 1,
      pointRadius: 0,
      hoverBorderColor: '#FF7E67',
      hoverBorderWidth: 1,
      pointHoverRadius: 0,
      order: 2,
    },
    {
      label: 'y',
      data: [
        {
          x: 0,
          y: 50,
        },
        {
          x: 0,
          y: -50,
        },
      ],
      fill: false,
      animation: false,
      borderColor: '#5C7AEA',
      borderWidth: 1,
      pointRadius: 0,
      hoverBorderColor: '#5C7AEA',
      hoverBorderWidth: 1,
      pointHoverRadius: 0,
      order: 1,
    },
    {
      label: 'Function',
      data: [],
      fill: false,
      backgroundColor: '#525252',
      borderColor: '#525252',
      borderWidth: 1,
      pointRadius: 0,
      tension: 0.1,
      hoverBackgroundColor: '#525252',
      hoverBorderColor: '#525252',
      hoverBorderWidth: 1,
      pointHoverRadius: 0,
      order: 0,
    },
  ],
};

const chartArea = {
  id: 'chartArea',
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = '#dbdbdb';
    ctx.lineWidth = 1;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#fff';
    ctx.strokeRect(left, top, width, height);
    ctx.fillRect(left, top, width, height);
    ctx.restore();
  },
};

let chart;

export const createChart = (chartCanvas) => {
  chart = new Chart(chartCanvas, {
    type: 'line',
    data: chartData,
    options: chartOptions,
    plugins: [chartArea],
  });
};

const updateChartBounds = (minX, maxX, minY, maxY) => {
  chart.options.scales.x.min = minX;
  chart.options.scales.x.max = maxX;
  chart.options.scales.y.min = minY;
  chart.options.scales.y.max = maxY;
  chart.data.datasets[0].data = [
    {
      x: minX,
      y: 0,
    },
    {
      x: maxX,
      y: 0,
    },
  ];
  chart.data.datasets[1].data = [
    {
      x: 0,
      y: minY,
    },
    {
      x: 0,
      y: maxY,
    },
  ];
};

export const updateChartData = (data, minX, maxX, minY, maxY) => {
  chart.data.datasets[2].data = data;
  updateChartBounds(
    round2Digits(minX),
    round2Digits(maxX),
    round2Digits(minY),
    round2Digits(maxY)
  );
  chart.update();
};
