import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Title from "../../components/title";

import api from "../../utils/api";

import styles from "./profile.module.css";

function Profile(props) {
  const [wishDelete, setWishDelete] = useState(false);
  const navigate = useNavigate();

  function deleteUser() {
    api
      .delete(`/user/${props.user.id}`, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then(
        navigate("/login"),
        localStorage.removeItem("token"),
        toast.success("Conta excluida com sucesso!")
      )
      .catch((error) => {
        toast.error("Falha na exclusão!");
        console.log(" ERRO na requisição", error.response);
      });
  }

  return (
    <>
      <Title text="Perfil"></Title>
      <div className={styles.container}>
        <div
          className={`${styles.subcontainer} ${
            wishDelete ? styles.hideSmooth : styles.showSmooth
          }`}
        >
          <div className={styles.subcontainer}>
            <p>
              <span>Usuário:</span> {props.user.name}
            </p>
            <p>
              <span>Email:</span> {props.user.email}
            </p>
          </div>
          <button className={styles.delete} onClick={() => setWishDelete(true)}>
            Excluir Usuário
          </button>
        </div>
        <div className={wishDelete ? styles.showDelete : styles.hideDelete}>
          <p>Deseja realmente excluir este usuário?</p>

          <div className={styles.options}>
            <input
              type="button"
              value="SIM, Desejo excluir!"
              className={styles.confirm}
              onClick={() => deleteUser()}
            />
            <input
              type="button"
              value="NÃO, Desejo manter!"
              className={styles.deny}
              onClick={() => setWishDelete(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
