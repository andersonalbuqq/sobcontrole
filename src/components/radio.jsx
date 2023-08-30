import React, { useEffect, useState } from "react";

import styles from "./radio.module.css";

let isFirstLoad = true;

function Radio(props) {
  const [checked, setChecked] = useState(props.options[1].value);

  if (
    props.previousData.type &&
    checked !== props.previousData.type &&
    isFirstLoad
  ) {
    setChecked(props.previousData.type);
    isFirstLoad = false;
  }

  function onOptionChange(e) {
    isFirstLoad = false;
    setChecked(e.target.value);
  }

  useEffect(() => {
    props.setOutput({ ...props.previousData, [props.name]: checked });

    // eslint-disable-next-line
  }, [checked]);

  function isSelected(value) {
    return checked === value;
  }

  function radioOptions() {
    return props.options.map((option, i) => {
      return (
        <div key={i} className={styles.input}>
          <input
            type="radio"
            name={props.name}
            value={option.value}
            onChange={onOptionChange}
            checked={isSelected(option.value)}
          />
          <span>{option.label}</span>
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>{props.title}</p>
      <label>{radioOptions()}</label>
    </div>
  );
}

export default Radio;
