import { Box } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Header from "components/index/admin/components/Header";
import { Product } from "lib/redux/slices/products";
import { processList } from "longProcesses/enums";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [chartData, setChartData] = useState<any>();
  const getDataMostViewedProducts: Worker = useMemo(
    () =>
      new Worker(
        new URL(
          "../../../longProcesses/getDataMostViewProducts.ts",
          import.meta.url
        )
      ),
    []
  );

  useEffect(() => {
    if (window.Worker) {
      getDataMostViewedProducts.postMessage(
        processList.getDataMostViewedProducts
      );
    }
  }, [getDataMostViewedProducts]);

  useEffect(() => {
    if (window.Worker) {
      getDataMostViewedProducts.onmessage = (e: MessageEvent) => {
        const nameProducts = e.data.map((item: Product) => item.title);
        const viewsProducts = e.data.map((item: Product) => item.views);
        setChartData({
          labels: nameProducts,
          datasets: [
            {
              label: "",
              data: viewsProducts,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
            },
          ],
        });
      };
    }
  }, [getDataMostViewedProducts]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Thống kê lượt xem sản phẩm",
      },
      legend: {
        display: false, // Remove Hide the Legend in Chart.js
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            // console.log("👌 ~ context", context[0].label.replaceAll(" ", ""));
            // return context[0].label.replaceAll(" ", ",");
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        ticks: {
          color: "rgba(255, 99, 132, 0.5)",
          callback: function (value: any, index: any, ticks: any) {
            // console.log(ticks);
            return chartData.labels[index].length > 20
              ? `${chartData.labels[index].substring(0, 20)}...`
              : chartData.labels[index];
          },
        },
        border: {
          color: "rgba(255, 99, 132, 0.5)",
        },
      },
      y: {
        beginAtZero: false,
        // type: "linear" as const,
        // display: true,
        // position: "left" as const,
        ticks: {
          color: "rgba(255, 99, 132, 0.5)",
          // callback: function (value: any, index: any, ticks: any) {
          //   console.log(value);
          //   return "$" + value;
          // },
        },
        afterTickToLabelConversion: function (data: any) {
          var xLabels = data.ticks;
          xLabels.forEach(function (label: any, i: any) {
            // check odd number
            if (xLabels[i].value % 1 !== 0) {
              xLabels[i] = { value: "12", label: "12" };
            }
          });
        },
        border: {
          color: "rgba(255, 99, 132, 0.5)",
        },
      },
      y1: {
        beginAtZero: false,
        type: "linear" as const,
        display: false,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: chartData ? chartData.labels : [],
    datasets: chartData ? chartData.datasets : [],
    // datasets: [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() => Math.random() * 1000),
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //     yAxisID: "y",
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: labels.map(() => Math.random() * 1000),
    //     borderColor: "rgb(53, 162, 235)",
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //     yAxisID: "y1",
    //   },
    // ],
  };

  if (!chartData) return <div>Loading...</div>;
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thống kê lượt xem" subtitle="Chào mừng tới thống kê" />
      </Box>
      {/* GRID & CHARTS */}
      <div style={{ margin: "0 50px 100px 50px" }}>
        {chartData && <Line options={options} data={data} />}
      </div>
    </Box>
  );
};

export default Analytics;
