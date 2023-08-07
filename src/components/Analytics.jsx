import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../provider/authProvider";
import jwt_decode from "jwt-decode";
const Analytics = () => {
  const [budgetName, setBudgetName] = useState("");
  const [maximumSpending, setMaximumSpending] = useState("");
  const { token } = useAuth();
  const userId = jwt_decode(token).id;
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddBudget = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend to add the budget
      const response = await axios.post(
        "http://localhost:3001/budget/addBudget",
        {
          user_id: userId,
          budget_name: budgetName,
          maximum_spending: maximumSpending,
        }
      );

      console.log("Budget added successfully:", response.data);
      // Reset the form
      setBudgetName("");
      setMaximumSpending("");
    } catch (error) {
      console.error("Failed to add budget:", error);
    }
  };
  const fetchBudgets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/budgets?userId=${userId}`
      );
      setBudgets(response.data);
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
    }
  };
  const fetchExpenses = async (budgetId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/expenses?userId=${userId}&budgetId=${budgetId}`
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };
  useEffect(() => {
    fetchBudgets();
  }, []);
  return (
    <div>
      <h2>Analytics</h2>
      <form onSubmit={handleAddBudget}>
        <label htmlFor="budgetName">Budget Name:</label>
        <input
          type="text"
          id="budgetName"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
        <label htmlFor="maximumSpending">Maximum Spending:</label>
        <input
          type="number"
          id="maximumSpending"
          value={maximumSpending}
          onChange={(e) => setMaximumSpending(e.target.value)}
        />
        <button type="submit">Add Budget</button>
      </form>
      <h3>Budgets</h3>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {budget.budget_name} - Maximum Spending: {budget.maximum_spending}
            <button onClick={() => fetchExpenses(budget.id)}>
              Load Expenses
            </button>
          </li>
        ))}
      </ul>

      {/* Display expenses for the selected budget */}
      {expenses.length > 0 && (
        <div>
          <h3>Expenses</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.expense_name} - Amount: {expense.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analytics;
