import React from "react";

import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

import styles from "./userinfo.module.css"

function Userinfo(props) {
  const navigate = useNavigate()

  function Logout() {
    localStorage.removeItem("token")
    navigate("/login")
    toast.info("Logout realizado com sucesso!")
  }

  return (
    <div className={styles.container}>
      <h4>{props.user.name}</h4>
      <input className={styles.button} type="button" onClick={Logout} value={"Sair"}/>
    </div>
  );
}

export default Userinfo;
