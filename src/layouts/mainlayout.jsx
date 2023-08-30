import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../utils/api";

import Sidebar from "../components/navigation";

import styles from "./mainlayout.module.css";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [token] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Efetue Login para ter acesso!");
      return;
    }

    try {
      api
        .get("/user/validatetoken", {
          headers: {
            Authorization: JSON.parse(token),
          },
        })
        .then((resp) => {
          if (!resp.data.auth) {
            navigate("/login");
            toast.warn("Erro de autenticação!");
            return;
          }
          setUser(resp.data.currentUser);
        });
    } catch (error) {
      console.log(error);
    }
  }, [token, navigate]);


  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar user={user} />
      </div>
      <div className={styles.adjustment}></div>
      <div className={styles.container}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { user, token });
        })}
      </div>

    </div>
  );
}

export default MainLayout;
