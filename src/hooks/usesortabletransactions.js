import { useMemo, useState } from "react";

const useSortableTransactions = (transactions, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...transactions];

    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { transactions: sortedTransactions, requestSort, sortConfig };
};

export default useSortableTransactions