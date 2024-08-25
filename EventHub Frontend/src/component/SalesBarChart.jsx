import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from '../data/salesBarChart';
import { height } from '@mui/system';

const valueFormatter = (value) => `${value}k`;

const chartSetting = {
  yAxis: [
    {
      label: 'Sales (10k)',
    },
  ],
  series: [
    { dataKey: 'seoul', label: 'Seoul Sales', valueFormatter },
    { dataKey: 'london', label: 'London Sales', valueFormatter },
    { dataKey: 'paris', label: 'Paris Sales', valueFormatter },
    { dataKey: 'newYork', label: 'New York Sales', valueFormatter },
  ],
width: 1000,
height:200,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function SalesBarChart() {
  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
