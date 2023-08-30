import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./register.module.css";

import api from "../../utils/api";

import CenterContainer from "../../layouts/centerContainer";
import Logo from "../../assets/logo/logoLight.png";
import Title from "../../components/title";
import Input from "../../components/input";
import Button from "../../components/button";

function Register() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/user/register", user).then((resp) => {
        localStorage.setItem("token", JSON.stringify(resp.data.token));
        toast.success(resp.data.message);
        navigate("/");
      });
    } catch (error) {
      toast.warning(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }

  return (
    <div className={styles.background}>
      <CenterContainer maxWidth="maxWidth600">
        <div className={styles.container}>
          <img className={styles.image} src={Logo} alt="Logo" />
          <div className={styles.mainSection}>
            <Title text="Criar Conta" />
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Nome"
                name="name"
                placeholder="Digite seu nome"
                handleChange={handleChange}
                value={user.name || ""}
                required={true}
                maxlength={100}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Digite seu email"
                handleChange={handleChange}
                value={user.email || ""}
                required={true}
                maxlength={100}
              />
              <Input
                type="password"
                label="Senha"
                name="password"
                placeholder="Digite sua senha"
                handleChange={handleChange}
                value={user.password || ""}
                required={true}
                maxlength={100}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                name="confirmpassword"
                placeholder="Repita sua senha"
                handleChange={handleChange}
                value={user.confirmpassword || ""}
                required={true}
              />
              <p>
                Já tem uma conta? <Link to="/login">Faça Login!</Link>
              </p>
              <div className={styles.button}>
                <Button label="Registrar" />
              </div>
            </form>
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}

export default Register;
