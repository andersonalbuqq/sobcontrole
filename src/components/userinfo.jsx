import React from "react";

import { Link, useNavigate } from "react-router-dom";
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
      <Link className={styles.name} to={'/profile'}>{props.user.name}</Link>
      <input className={styles.button} type="button" onClick={Logout} value={"Sair"}/>
    </div>
  );
}

export default Userinfo;
