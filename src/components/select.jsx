import React, { useEffect, useState } from "react";

import styles from "./select.module.css";

function Select(props) {
  const [selected, setSelected] = useState("");

  //sets the value if there is no change after the options are loaded
  useEffect(() => {
    if (selected === "" && props.options[0]) {
      setSelected(props.options[0].id);
    }
    // eslint-disable-next-line
  }, [props.options]);

  function onOptionChange(e) {
    setSelected(e.target.value);
  }

  useEffect(() => {
    props.setOutput({ ...props.previousData, [props.name]: selected });
    // eslint-disable-next-line
  }, [selected]);

  function getOptions() {
    return props.options.map((option, i) => {
      return (
        <option className={styles.option} value={option.id} key={i}>
          {option.name}
        </option>
      );
    });
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{props.title}</p>
      <select
        className={styles.select}
        name={props.name}
        id={props.name}
        onChange={onOptionChange}
      >
        {getOptions()}
      </select>
    </div>
  );
}

export default Select;
