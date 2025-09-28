import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const years = [
  new Date(2004, 0, 1),
  new Date(2005, 0, 1),
  new Date(2006, 0, 1),
  new Date(2007, 0, 1),
  new Date(2008, 0, 1),
  new Date(2009, 0, 1),
  new Date(2010, 0, 1),
  new Date(2011, 0, 1),
  new Date(2012, 0, 1),
  new Date(2013, 0, 1),
  new Date(2014, 0, 1),
  new Date(2015, 0, 1),
  new Date(2016, 0, 1),
  new Date(2017, 0, 1),
  new Date(2018, 0, 1),
];

const doanh_thu = [
  25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982,
  30186.945, 31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44,
  35528.715, 36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582,
  43189, 43320, 43413, 43922, 44293, 44689, 45619.785, 46177.617,
];

const lineChartsParams = {
  series: [
    {
      label: "doanh thu",
      data: doanh_thu,
      showMark: false,
    },
  ],
  height: 300,
  margin: { left: 0 },
  yAxis: [{ width: 50 }],
};

const yearFormatter = (date) => date.getFullYear().toString();
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export default function Statistical() {
  return (
    <LineChart
      {...lineChartsParams}
      xAxis={[
        { data: years, scaleType: "time", valueFormatter: yearFormatter },
      ]}
      series={lineChartsParams.series.map((series) => ({
        ...series,
        valueFormatter: (v) => (v === null ? "" : currencyFormatter(v)),
      }))}
    />
  );
}
