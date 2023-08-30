import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./login.module.css";

import api from "../../utils/api";

import CenterContainer from "../../layouts/centerContainer";
import Button from "../../components/button";
import Title from "../../components/title";
import Input from "../../components/input";
import Logo from "../../assets/logo/logoLight.png";

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/user/login", user).then((resp) => {
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
      <CenterContainer maxWidth="maxWidth1000">
        <div className={styles.container}>
          <div className={styles.contentSection}>
            <Title text="Login" />
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email:"
                name="email"
                placeholder="Digite seu email"
                handleChange={handleChange}
                value={user.email || ""}
                required={true}
              />
              <Input
                type="password"
                label="Senha:"
                name="password"
                placeholder="Digite sua senha"
                handleChange={handleChange}
                value={user.password || ""}
                required={true}
              />
              <p>
                Não tem uma conta? <Link to="/register">Crie uma!</Link>
              </p>
              <div className={styles.button}>
                <Button label="Entrar" />
              </div>
            </form>
          </div>
          <div className={styles.imageSection}>
            <img className={styles.image} src={Logo} alt="Logo" />
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}

export default Login;
