import React from "react";
import ReactEcharts from "echarts-for-react";

import styles from "./linechart.module.css";

function Linechart(props) {
  const option = {
    title: {
      text: [props.name],
      textStyle: {
        color: "#192340",
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "category",
      data: props.data.legend,
      name: "Data",
    },
    yAxis: {
      type: "value",
      name: "Saldo",
    },
    series: [
      {
        data: props.data.value,
        type: "line",
        smooth: true,
      },
    ],
  };
  return (
    <>
      <div className={styles.container}>
        {props.data.legend.length === 0 ? (
          <div className={styles.notice}>Sem Movimentações</div>
        ) : (
          <ReactEcharts option={option} />
        )}
      </div>
    </>
  );
}

export default Linechart;
