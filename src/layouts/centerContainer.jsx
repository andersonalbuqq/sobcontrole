import React from "react";

import styles from "./centerContainer.module.css";

function centerContainer(props) {
  return (
    <div className={styles.position}>
      <div className={`${styles.container}  ${styles[props.maxWidth]}`}>
        {props.children}
      </div>
    </div>
  );
}

export default centerContainer;
