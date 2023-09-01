import React, { useEffect, useState } from "react";

import Title from "../../components/title";
import Input from "../../components/input";
import Button from "../../components/button";

import styleTransaction from "./mytransactions.module.css";
import styles from "./manageaccounts.module.css";

import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageAccounts(props) {
  const navigate = useNavigate();
  const [refreshItems, setRefreshItems] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [newAccount, setNewAccount] = useState({});
  const [editAccount, setEditAccount] = useState({});
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!props.user) {
      return;
    }
    api
      .get(`/account/all/${props.user.id}`, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then((resp) => {
        setAccounts(resp.data.accounts);
      })
      .catch((error) => {
        if (error.response.status === 404) {
        } else {
          navigate("/");
        }
      });
  }, [navigate, props.token, props.user, refreshItems]);

  function getData() {  
    const editAccount = (id) => {
      api
        .get(`account/${id}`, {
          headers: {
            Authorization: JSON.parse(props.token),
          },
        })
        .then((resp) => {
          setEditAccount(resp.data.account);
          setIsEditing(true);
        });
    };

    const deleteAccount = (id) => {
      api
        .delete(`/account/${id}`, {
          headers: {
            Authorization: JSON.parse(props.token),
          },
        })
        .then(() => {
          toast.info("Conta excluída!");
          setRefreshItems(refreshItems + 1);
        })
        .catch((error) => {
          toast.error("Falha na exclusão");
          console.log(error);
        });
    };

    return accounts.map((account, i) => {
      return (
        <tr key={i}>
          <td>{account.name}</td>
          <td>
            <div className={styleTransaction.options}>
              <button onClick={() => editAccount(account.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 17 13"
                  className={styleTransaction.edit}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </button>
              <button onClick={() => deleteAccount(account.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 17 14"
                  className={styleTransaction.delete}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const handleChangeAdd = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  function handleAdd(e) {
    e.preventDefault();

    if (newAccount.name !== undefined && newAccount.name !== "") {
      api
        .post("/account/create", newAccount, {
          headers: {
            Authorization: JSON.parse(props.token),
          },
        })
        .then((resp) => {
          toast.success("Conta Inserida!");
          setNewAccount({});
          setRefreshItems(refreshItems + 1);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422) {
            toast.warning(error.response.data.message);
          } else toast.error("Falha ao inserir conta, tente novamente!");
        });
    }
  }

  const handleChangeEdit = (e) => {
    setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (editAccount.name !== undefined && editAccount.name !== "") {
      api
        .put(`/account/${editAccount.id}`, editAccount, {
          headers: {
            Authorization: JSON.parse(props.token),
          },
        })
        .then((resp) => {
          toast.success("Atualizado com sucesso!");
          setEditAccount({});
          setIsEditing(false);
          setRefreshItems(refreshItems + 1);
        });
    } else {
      toast.warning("O nome da conta é obrigatório.");
    }
  };

  return (
    <>
      <Title text="Minhas Contas" />

      <div className={styles.container}>
        <div className={isEditing ? styles.showEdit : styles.hideEdit}>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className={styles.closeButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>

          <form onSubmit={handleEdit} className={styles.form}>
            <Input
              type="text"
              label="Conta"
              name="name"
              placeholder="Nome da conta"
              handleChange={handleChangeEdit}
              value={editAccount.name || ""}
              maxlength={100}
            />
            <div className={styles.button}>
              <Button label="Atualizar" />
            </div>
          </form>
        </div>
        <form
          onSubmit={handleAdd}
          className={`${styles.form} ${isEditing ? styles.hideSmooth : styles.showSmooth}`}
        >
          <Input
            type="text"
            label="Nova conta"
            name="name"
            placeholder="Nome da conta"
            handleChange={handleChangeAdd}
            value={newAccount.name || ""}
            maxlength={100}
          />

          <div className={styles.button}>
            <Button label="Adicionar" />
          </div>
        </form>

        {accounts.length !== 0 ? (
          <table
            className={`${styleTransaction.table} ${
              isEditing ? styles.hideSmooth : styles.showSmooth
            }`}
          >
            <thead>
              <tr>
                <th className={styleTransaction.topleft}>Conta</th>
                <th className={styleTransaction.topright}>Opções</th>
              </tr>
            </thead>
            <tbody>{getData()}</tbody>
          </table>
        ) : (
          <div className={styles.message}>
            Adicione suas contas, e aproveite!
          </div>
        )}
      </div>
    </>
  );
}

export default ManageAccounts;
