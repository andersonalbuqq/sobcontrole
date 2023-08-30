import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

import Title from "../../components/title";
import Input from "../../components/input";
import Select from "../../components/select";
import Radio from "../../components/radio";
import Button from "../../components/button";

import styles from "./addtransaction.module.css";

function AddTransaction(props) {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [transaction, setTransaction] = useState({});

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
          navigate("/myaccounts");
          toast.warning("Adicione ao menos uma conta para ter acesso!");
        } else {
          console.log(error);
          navigate("/");
        }
      });
  }, [props.user, props.token, navigate]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    api
      .post("/transaction/create", transaction, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then(
        toast.success("Movimentação inserida!"),
        setTransaction({}),
        navigate("/mytransactions")
      )
      .catch((error) => {
        console.log(" ERRO na requisição", error);
      });
  }

  return (
    <>
      <Title text="Adicionar Movimentação" />

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Descrição"
            name="description"
            placeholder="Descreva a movimentação"
            handleChange={handleChange}
            value={transaction.description || ""}
            required={true}
            maxlength={150}
          />
          <Input
            type="date"
            label="Data da movimentação"
            name="date"
            required={true}
            handleChange={handleChange}
            value={transaction.date || ""}
          />

          <Input
            type="number"
            label="Valor"
            name="value"
            handleChange={handleChange}
            placeholder="0,00"
            value={transaction.value || ""}
            required={true}
            min="0"
            step="0.01"
          />

          <Select
            title="Origem"
            name="id_account"
            options={accounts}
            previousData={transaction}
            setOutput={setTransaction}
          />

          <Radio
            title="Tipo de movimentação"
            options={[
              { label: "Entrada", value: "entry" },
              { label: "Saída", value: "exit" },
            ]}
            name="type"
            previousData={transaction}
            setOutput={setTransaction}
          />
          <div className={styles.button}>
            <Button label="Adicionar" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;
