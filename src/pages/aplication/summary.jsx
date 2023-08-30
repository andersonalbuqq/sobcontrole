import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Title from "../../components/title";
import api from "../../utils/api";
import Piechart from "../../components/piechart";
import Linechart from "../../components/linechart";
import Select from "../../components/select";

import styles from "./summary.module.css";

function Summary(props) {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

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
        console.log(error);
      });
  }, [props.token, props.user]);

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
        setTransactions(resp.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.token, props.user]);

  function getBalance() {
    if (accounts.length > 0) {
      let totalBalance = accounts.reduce((total, account) => {
        return +total + +account.balance;
      }, 0);

      return totalBalance.toFixed(2);
    }
  }

  function getAccountsToTable() {
    if (accounts.length > 0) {
      return accounts.map((account, i) => {
        return (
          <tr key={i}>
            <td>{account.name}</td>
            <td className={styles.moneyCell}>{account.balance} R$</td>
          </tr>
        );
      });
    }
  }

  function getAccountsToGraphic() {
    if (accounts.length > 0) {
      let data = accounts.map((account) => {
        if (account.balance > 0) {
          return {
            value: +account.balance,
            name: account.name,
          };
        } else {
          return { value: 0, name: account.name };
        }
      });

      data = data.sort((a, b) =>
        +a.value < +b.value ? 1 : +a.value > +b.value ? -1 : 0
      );

      return [...data];
    }
  }

  function getAccountName(id_account) {
    if (accounts.length > 0 && id_account) {
      return accounts.filter((account) => account.id === +id_account)[0].name;
    }
  }

  function getDataToLineGraphic(id_account) {
    const formatDate = (Date) => {
      return Date.split("T")[0].split("-").reverse().join(" / ");
    };

    if (transactions.length > 0) {
      let legend = [];
      let value = [];
      let balance = 0;

      transactions
        .filter((transaction) => transaction.id_account === +id_account)
        .forEach((transaction) => {
          legend.push(formatDate(transaction.date));
          value.push(
            transaction.type === "entry"
              ? (balance = balance + +transaction.value)
              : (balance = balance - +transaction.value)
          );
        });

      return { legend, value };
    }
  }

  return (
    <div>
      <Title text="Início" />

      {accounts.length !== 0 ? (
        <div className={styles.container}>
          <table className={styles.table}>
            <caption>Quadro Resumo</caption>
            <tbody>
              {getAccountsToTable()}
              <tr>
                <td>Saldo</td>
                <td className={styles.moneyCell}>{getBalance()} R$</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.piechart}>
            {+getBalance() > 0 ? (
              <Piechart data={getAccountsToGraphic()} />
            ) : (
              ""
            )}
          </div>

          <div className={styles.select}>
            <Select
              title="Selecione uma conta"
              name="id_account"
              options={accounts}
              previousData={selectedAccount}
              setOutput={setSelectedAccount}
            />
          </div>
          {getDataToLineGraphic(selectedAccount.id_account) ? (
            <Linechart
              name={getAccountName(selectedAccount.id_account)}
              data={getDataToLineGraphic(selectedAccount.id_account)}
            />
          ) : (
            false
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <Link to="/myaccounts" className={styles.add}>
            Insira ao menos uma conta e aproveite!
          </Link>
        </div>
      )}
    </div>
  );
}

export default Summary;
