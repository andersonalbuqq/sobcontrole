import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo/logoLight.png";
import UserInfo from "./userinfo";

import styles from "./navigation.module.css";

function Navigation(props) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 900 ? false : true);

  const showMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt="Logo" />
      <div>
        <div className={styles.menu}>
          <button  onClick={showMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              className={styles.list}
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>
        <ul
          className={`${styles.options} ${
            (isOpen ) ? styles.hideMenu : styles.open
          }`}
        >
          <li>
            <Link to={"/"}>Início</Link>
          </li>
          <li>
            <Link to={"/addtransaction"}>Nova Movimentação</Link>
          </li>
          <li>
            <Link to={"/mytransactions"}>Minhas Movimentações</Link>
          </li>
          <li>
            <Link to={"/myaccounts"}>Gerenciar Contas</Link>
          </li>
        </ul>
      </div>
      <div className={`${isOpen ? styles.hideMenu : styles.openUser}`}>
        <UserInfo {...props} />
      </div>
    </div>
  );
}

export default Navigation;
