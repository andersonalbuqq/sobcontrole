import React from "react";

import styles from "./button.module.css"

function Button(props){
    return(
      <button type="submit" className={styles.button}>{props.label}</button>
    )
}

export default Button