import React from "react";

import styles from './title.module.css'

function Title(props){
  return(
    <>
      <h1 className={styles.title}>{props.text}</h1>
      <hr className={styles.line}/>
    </>
  )
}

export default Title