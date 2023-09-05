import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../../components/title";
import Input from "../../components/input";
import Filter from "../../components/filter";

import styles from "./mytransactions.module.css";

import useSortableTransactions from "../../hooks/usesortabletransactions";
import api from "../../utils/api";
import { toast } from "react-toastify";

function MyTransactions(props) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [searched, setSearched] = useState("");
  const [deleteItem, setDeleteItem] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [dateFilter, setDateFilter] = useState({});
  const [disorderlyTransactions, setDisorderlyTransactions] = useState([]);
  const { transactions, requestSort } = useSortableTransactions(
    disorderlyTransactions
  );

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
  }, [navigate, props.token, props.user]);

  useEffect(() => {
    if (!props.user) {
      return;
    }

    api
      .get(`/transaction/all/${props.user.id}`, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then((resp) => {
        setDisorderlyTransactions(resp.data.transactions);
        requestSort("date");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
    // eslint-disable-next-line
  }, [navigate, props.token, props.user, deleteItem]);

  if (accounts.length === 0) {
    return;
  }

  const formatDate = (Date) => {
    return Date.split("T")[0].split("-").reverse().join(" / ");
  };

  const getAccountName = (id_account) => {
    const account = accounts.filter((account) => {
      return account.id === id_account;
    });
    return account[0].name;
  };

  function getData() {
    return transactions
      .filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(searched.toLocaleLowerCase());
      })
      .filter((transaction) => {
        if (hasFilter) {
          const year = transaction.date.split("-")[0];
          const month = transaction.date.split("-")[1];

          if (year === dateFilter.year && month === dateFilter.month) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .map((transaction, i) => {
        return (
          <tr key={i}>
            <td className={styles.noWrap}>{formatDate(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td className={styles.noWrap}>
              {transaction.value.toFixed(2).replace(".", ",")}
              <span> R$</span>
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                viewBox="0 0 17 12"
                className={`${
                  transaction.type === "entry" ? styles.entry : styles.exit
                }`}
              >
                <path d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
            </td>
            <td>{getAccountName(transaction.id_account)}</td>
            <td>
              <div className={styles.options}>
                <button onClick={() => EditTransaction(transaction.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 17 13"
                    className={styles.edit}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </button>
                <button onClick={() => deleteTransaction(transaction.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 17 14"
                    className={styles.delete}
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

  function deleteTransaction(id) {
    api
      .delete(`/transaction/${id}`, {
        headers: {
          Authorization: JSON.parse(props.token),
        },
      })
      .then(() => {
        toast.info("Movimentação excluída!");
        setDeleteItem(deleteItem + 1);
      });
  }

  function EditTransaction(id) {
    window.location.assign(`/edittransaction/${id}`);
  }

  function getTotal() {
    return transactions
      .filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(searched.toLocaleLowerCase());
      })
      .filter((transaction) => {
        if (hasFilter) {
          const year = transaction.date.split("-")[0];
          const month = transaction.date.split("-")[1];

          if (year === dateFilter.year && month === dateFilter.month) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .reduce((total, transaction) => {
        return transaction.type === "entry"
          ? total + +transaction.value
          : total - +transaction.value;
      }, 0);
  }

  if (!isLoaded) {
    return (
      <div className={styles.container}>
        {" "}
        <span>CARREGANDO ...</span>
      </div>
    );
  } else {
    return (
      <>
        <Title text="Minhas Movimentações" />

        <div className={styles.container}>
          <Input
            label="Buscar Movimentação"
            type="search"
            name="search"
            placeholder="Faça sua pesquisa"
            value={searched}
            handleChange={(e) => {
              setSearched(e.target.value);
            }}
          />
          <button
            className={`${styles.filterButton} ${hasFilter ? styles.hide : ""}`}
            onClick={() => setHasFilter(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
            &nbsp;Filtrar Período
          </button>

          <button
            className={`${styles.removeFilter} ${hasFilter ? "" : styles.hide}`}
            onClick={() => setHasFilter(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="red"
              viewBox="0 0 16 16"
            >
              <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
            </svg>
            &nbsp;Remover Filtro
          </button>

          <div
            className={
              hasFilter ? `${styles.showFilter}` : `${styles.hideFilter}`
            }
          >
            <Filter
              transactions={transactions}
              filter={dateFilter}
              setFilter={setDateFilter}
            />
          </div>

          {getData().length ? (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.topleft}>
                      <input
                        type="button"
                        value={"Data"}
                        onClick={() => requestSort("date")}
                      />
                    </th>
                    <th>
                      <input
                        type="button"
                        value={"Movimentação"}
                        onClick={() => requestSort("description")}
                      />
                    </th>
                    <th>
                      <input
                        type="button"
                        value={"Valor"}
                        onClick={() => requestSort("value")}
                      />
                    </th>
                    <th>Tipo</th>
                    <th>Origem</th>
                    <th className={styles.topright}>Opções</th>
                  </tr>
                </thead>
                <tbody>{getData()}</tbody>
              </table>

              <p className={styles.total}>
                Total: {getTotal().toFixed(2).replace(".", ",")} R$
              </p>
            </>
          ) : (
            <div className={styles.noResult}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 10"
              >
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
              <span>Não encontramos nenhuma movimentação</span>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MyTransactions;
