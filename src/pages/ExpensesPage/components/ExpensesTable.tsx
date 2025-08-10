import React from 'react';

import styles from './ExpensesTable.module.scss';

interface Expense {
  id: number;
  name: string;
  category: string;
  description?: string;
  amount: number;
}

interface Props {
  expenses: Expense[];
}

const ExpensesTable: React.FC<Props> = ({ expenses }) => {
  return (
    <div className={styles.expensesTable}>
      <div className={styles.headerRow}>
        <span className={styles.columnName}>Name</span>
        <span className={styles.columnCategory}>Category</span>
        <span className={styles.columnDescription}>Description</span>
        <span className={styles.columnAmount}>Amount</span>
        <span className={styles.columnActions}>Actions</span>
      </div>

      {expenses.map((expense) => (
        <div className={styles.dataRow} key={expense.id}>
          <span className={styles.columnName}>{expense.name}</span>
          <span className={styles.columnCategory}>{expense.category}</span>
          <span className={styles.columnDescription}>
            {expense.description ? (
              <span title={expense.description}>
                {expense.description.length > 40 ? expense.description.slice(0, 40) + '...' : expense.description}
              </span>
            ) : (
              '-'
            )}
          </span>
          <span className={styles.columnAmount}>UGX {expense.amount.toLocaleString()}</span>
          <span className={styles.columnActions}>
            <button className={styles.editBtn}>Edit</button>
            <button className={styles.deleteBtn}>Delete</button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExpensesTable;
