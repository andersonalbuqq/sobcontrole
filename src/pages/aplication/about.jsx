import React from "react";

import Title from "../../components/title";

import styles from "./about.module.css";

function About(props) {
  return (
    <>
      <Title text="Sobre o Projeto" />
      <div className={styles.container}>
        <h3 className={styles.title}>Objetivo</h3>
        <p className={styles.paragraph}>
          &nbsp;&nbsp;&nbsp;&nbsp;Este projeto tem como principal objetivo a
          pratica dos conhecimentos adquiridos durante a graduação e também
          cursos a parte feitos por mim de React.js e Node.js.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Nele foram empregadas tecnologias como: <br />
          <ul className={styles.list}>
            <li>HTML 5</li>
            <li>CSS</li>
            <li>React.js</li>
            <li>Toastify</li>
            <li>Java Script</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>Bcrypt</li>
            <li>Axios</li>
            <li>Json Web Token</li>
            <li>Sequelize</li>
            <li>PostgreSQL</li>
          </ul>
          Entre outras...
        </p>
        <br />
        <h3 className={styles.title}>Conceito</h3>
        <p className={styles.paragraph}>
          &nbsp;&nbsp;&nbsp;&nbsp;Quanto ao projeto em si, trata-se de um
          software para o gerenciamento das finanças pessoais, de forma que seja
          possível ter um melhor acompanhamento da distribuição dos gastos.
        </p>
        <br />
        <h3 className={styles.title}>Sobre mim</h3>
        <p className={styles.paragraph}>
          &nbsp;&nbsp;&nbsp;&nbsp;Me chamo Anderson, atualmente sou estudante do
          Curso de Análise e Desenvolvimento de sistemas. <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Minhas redes:{" "}
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/anderson-mendes-b90852235/"
            rel="external"
            target="blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 43"
              fill="#FFFAFA"
            >
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
            </svg>
          </a>
          <a
            className={styles.link}
            href="https://github.com/andersonalbuqq"
            rel="external"
            target="blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 19"
              fill="#FFFAFA"
            >
              <path
                d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2Z"
                opacity=".3"
              ></path>
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
          </a>
        </p>
        <p className={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp;Email: andersonmendes05@gmail.com</p>
      </div>
    </>
  );
}

export default About;
