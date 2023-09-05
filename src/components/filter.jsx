import React, { useEffect, useState } from "react";

import Select from "./select";

import styles from "./filter.module.css";

function Filter(props) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    props.setFilter({ ...selectedMonth, ...selectedYear });
    //eslint-disable-next-line
  }, [selectedYear]);

  useEffect(() => {
    props.setFilter({ ...selectedMonth, ...selectedYear });
    //eslint-disable-next-line
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonth(getMonths()[0] ? { month: getMonths()[0].id } : "");
    //eslint-disable-next-line
  }, [selectedYear]);

  function getYears() {
    return props.transactions
      .map((transaction) => {
        return transaction.date.split("-")[0];
      })
      .filter((year, index, self) => {
        return self.indexOf(year) === index;
      })
      .map((year) => {
        return { name: year, id: year };
      })
      .reverse();
  }

  function getMonths() {
    return props.transactions
      .filter((transaction) => {
        return transaction.date.split("-")[0] === selectedYear.year;
      })
      .map((transaction) => {
        return transaction.date.split("-")[1];
      })
      .filter((month, index, self) => {
        return self.indexOf(month) === index;
      })
      .map((month) => {
        switch (month) {
          case "01":
            return { name: "Janeiro", id: month };
          case "02":
            return { name: "Fevereiro", id: month };
          case "03":
            return { name: "Março", id: month };
          case "04":
            return { name: "Abril", id: month };
          case "05":
            return { name: "Maio", id: month };
          case "06":
            return { name: "Junho", id: month };
          case "07":
            return { name: "Julho", id: month };
          case "08":
            return { name: "Agosto", id: month };
          case "09":
            return { name: "Setembro", id: month };
          case "10":
            return { name: "Outubro", id: month };
          case "11":
            return { name: "Novembro", id: month };
          default:
            return { name: "Dezembro", id: month };
        }
      })
      .reverse();
  }

  return (
    <div>
      <div className={styles.options}>
        <Select
          title="Ano"
          name="year"
          options={getYears()}
          previousData={selectedYear}
          setOutput={setSelectedYear}
        />

        <Select
          title="Mês"
          name="month"
          options={getMonths()}
          previousData={selectedMonth}
          setOutput={setSelectedMonth}
        />
      </div>
    </div>
  );
}

export default Filter;
