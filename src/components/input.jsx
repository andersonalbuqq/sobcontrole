import React from "react";

import styles from "./input.module.css";

function Input(props) {

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className={styles.input}

        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        value={props.value}
        step={props.step || null}
        min={props.min || null}
        maxLength={props.maxlength || null}
        required={props.required || false}
      />
    </div>
  );
}

export default Input;
