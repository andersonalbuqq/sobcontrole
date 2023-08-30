import React from "react";
import ReactEcharts from "echarts-for-react";

import styles from "./piechart.module.css";

function Piechart(props) {
  if (!props.data) {
    return;
  }

  const option = {
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "Distribuição do Saldo",
      textStyle: {
        color: "#192340",
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    legend: {
      top: "80%",
      left: "center",
      selectedMode: true,
    },
    grid: {
      right: "50%",
    },
    series: [
      {
        name: "Distribuição do Saldo",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        itemStyle: {
          borderRadius: 3,
          borderColor: "#fff",
          borderWidth: 0,
        },
        // adjust the start angle
        startAngle: 180,
        label: {
          show: true,
          formatter(param) {
            // correct the percentage
            return param.name + " (" + param.percent * 2 + "%)";
          },
        },
        data: [
          ...props.data,
          {
            // make an record to fill the bottom 50%
            value: props.data.reduce((total, account) => {
              return +total + +account.value;
            }, 0),
            itemStyle: {
              // stop the chart from rendering this piece
              color: "none",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <br />
      <div className={styles.container}>
        <ReactEcharts option={option} />
      </div>
    </>
  );
}

export default Piechart;
