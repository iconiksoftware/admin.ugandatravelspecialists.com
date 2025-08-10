import React, { useState } from 'react';

import styles from './styles.module.scss';

const ITEMS_PER_PAGE = 5;

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState<'expenses' | 'categories'>('expenses');
  const [expensePage, setExpensePage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  const expenses = [
    { id: 1, name: 'Flour Purchase', category: 'Ingredients', description: 'Purchased 50kg of flour from supplier.', amount: 120000 },
    { id: 2, name: 'Electricity Bill', category: 'Utilities', description: '', amount: 75000 },
    { id: 3, name: 'Transport', category: 'Logistics', description: 'Delivery van fuel and maintenance.', amount: 56000 },
    { id: 4, name: 'Water Bill', category: 'Utilities', description: 'Monthly water usage for baking.', amount: 30000 },
    { id: 5, name: 'Internet', category: 'Utilities', description: 'Internet bill for online orders.', amount: 80000 },
    { id: 6, name: 'Baking Soda', category: 'Ingredients', description: '', amount: 15000 },
  ];

  const categories = [
    { id: 1, name: 'Ingredients', description: 'All baking ingredients including flour, sugar, and more.' },
    { id: 2, name: 'Utilities', description: 'Electricity, water, and internet bills.' },
    { id: 3, name: 'Logistics', description: 'Transport and delivery-related costs.' },
    { id: 4, name: 'Staff', description: 'Salaries, lunch, and staff-related expenses.' },
    { id: 5, name: 'Repairs', description: 'Bakery equipment maintenance.' },
    { id: 6, name: 'Marketing', description: 'Facebook ads, posters, and other promotional activities.' },
  ];

  const truncate = (text: string, length: number = 40) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const paginate = (data: any[], page: number) => data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const expensesPageCount = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  const categoriesPageCount = Math.ceil(categories.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.expensesPage}>
      <h1>Expenses</h1>

      <div className={styles.tabs}>
        <button className={activeTab === 'expenses' ? styles.active : ''} onClick={() => setActiveTab('expenses')}>
          Expenses
        </button>
        <button className={activeTab === 'categories' ? styles.active : ''} onClick={() => setActiveTab('categories')}>
          Categories
        </button>
      </div>

      {activeTab === 'expenses' && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(expenses, expensePage).map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.category}</td>
                  <td>{truncate(expense.description)}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button onClick={() => setExpensePage((p) => Math.max(1, p - 1))} disabled={expensePage === 1}>
              Back
            </button>
            <span>
              Page {expensePage} of {expensesPageCount}
            </span>
            <button onClick={() => setExpensePage((p) => Math.min(expensesPageCount, p + 1))} disabled={expensePage === expensesPageCount}>
              Next
            </button>
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(categories, categoryPage).map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{truncate(category.description)}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button onClick={() => setCategoryPage((p) => Math.max(1, p - 1))} disabled={categoryPage === 1}>
              Back
            </button>
            <span>
              Page {categoryPage} of {categoriesPageCount}
            </span>
            <button onClick={() => setCategoryPage((p) => Math.min(categoriesPageCount, p + 1))} disabled={categoryPage === categoriesPageCount}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpensesPage;
