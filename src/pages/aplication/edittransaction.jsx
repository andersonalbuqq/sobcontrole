import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import api from "../../utils/api";

import Title from "../../components/title";
import Input from "../../components/input";
import Radio from "../../components/radio";
import Button from "../../components/button";

import styles from "./addtransaction.module.css";
import Select from "../../components/select";

function EditTransaction(props) {
  const id_transaction = useParams().id;
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        navigate("/mytransactions");
      });
  }, [props.user, props.token, navigate]);

  useEffect(() => {
    api
      .get(`/transaction/${id_transaction}`, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then((resp) => {
        const formattedDate = resp.data.transaction.date.split("T")[0];
        setTransaction({ ...resp.data.transaction, date: formattedDate });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          toast.warn("Transação inexistente");
        }
        navigate("/mytransactions");
      });
  }, [navigate, props.token, id_transaction]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    api
      .put(`/transaction/${id_transaction}`, transaction, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then(
        toast.success("Movimentação atualizada!"),
        setTransaction({}),
        navigate("/mytransactions")
      )
      .catch((error) => {
        toast.error("Falha na atualização!");
        console.log(" ERRO na requisição", error.response);
      });
  }

  if (!isLoaded) {
    return <div> CARREGANDO ...</div>;
  } else {
    return (
      <>
        <Title text="Atualizar Movimentação" />

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
              <Button label="Atualizar" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EditTransaction;
