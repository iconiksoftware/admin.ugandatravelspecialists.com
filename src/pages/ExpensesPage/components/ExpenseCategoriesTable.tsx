import React from 'react';
import styles from './ExpenseCategoriesTable.module.scss';

interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
}

interface Props {
  categories: ExpenseCategory[];
  onEdit: (category: ExpenseCategory) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const ExpenseCategoriesTable: React.FC<Props> = ({ categories, currentPage, totalPages }) => {
  const onEdit = () => console.log('On edit');
  const onDelete = () => console.log('On edit');
  const onPrev = () => console.log('On edit');
  const onNext = () => console.log('On edit');

  return (
    <div className={styles.expenseCategoriesTable}>
      <div className={styles.header}>
        <h2>Expense Categories</h2>
        <button>Add Category</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td className={styles.description}>{cat.description || '—'}</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.editButton} onClick={() => onEdit()}>
                    Edit
                  </button>
                  <button className={styles.deleteButton} onClick={() => onDelete()}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={3}>No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={onPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={onNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenseCategoriesTable;
