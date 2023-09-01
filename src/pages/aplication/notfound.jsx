import React from "react";

import styles from "./notfound.module.css"

function NotFound(props) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Página Não encontrada! &#128577;</p> 
    </div>
  );
}

export default NotFound;
