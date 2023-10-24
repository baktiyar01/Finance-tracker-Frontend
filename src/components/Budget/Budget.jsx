import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import jwt_decode from "jwt-decode";
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpenseForm";
import BudgetList from "./BudgetList";
import TotalBudgetCard from "./TotalBudgetCard";
import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ViewExpenseForm from "./ViewExpenseForm";

const Budget = () => {
  const { token } = useAuth();
  const userId = jwt_decode(token).id;
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleShowAddBudgetForm = () => {
    setShowAddBudgetForm(true);
  };

  const handleCloseAddBudgetForm = () => {
    setShowAddBudgetForm(false);
  };
  const handleShowAddExpenseForm = () => {
    setShowAddExpenseForm(true);
  };

  const handleCloseAddExpenseForm = () => {
    setShowAddExpenseForm(false);
  };
  const handleShowViewExpenseForm = (budgetId) => {
    setSelectedBudgetId(budgetId);
  };

  const handleAddBudget = async (budgetData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/budget/addBudget`,
        {
          user_id: userId,
          ...budgetData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBudgets();
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
    handleCloseAddBudgetForm();
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await Promise.all(
        expenses
          .filter((expense) => expense.budget_id === budgetId)
          .map((expense) =>
            axios.delete(`${apiUrl}/data/expenses/${expense.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
      );
      await axios.delete(`${apiUrl}/data/budgets/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBudgets();
      fetchExpenses();
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/budget/addExpense`,
        {
          user_id: userId,
          ...expenseData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchExpenses(expenseData.budget_id.id);
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget.id === expenseData.budget_id.id
            ? { ...budget, amount: budget.amount + expenseData.amount }
            : budget
        )
      );
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
    handleCloseAddExpenseForm();
  };

  const handleDeleteExpense = async (expenseId, budgetId) => {
    try {
      await axios.delete(`${apiUrl}/data/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchExpenses(budgetId);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/data/budgets?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBudgets(response.data);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const fetchExpenses = async (budgetId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/data/expenses?userId=${userId}&budgetId=${budgetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={handleShowAddBudgetForm}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={handleShowAddExpenseForm}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <BudgetList
            budgets={budgets}
            handleFetchExpenses={fetchExpenses}
            handleShowAddExpenseForm={handleShowAddExpenseForm}
            handleShowViewExpenseForm={handleShowViewExpenseForm}
            expenses={expenses}
          />
          <TotalBudgetCard expenses={expenses} budgets={budgets} />
        </div>
      </Container>

      <AddBudgetForm
        show={showAddBudgetForm}
        handleClose={handleCloseAddBudgetForm}
        handleAddBudget={handleAddBudget}
      />

      <AddExpenseForm
        show={showAddExpenseForm}
        handleClose={handleCloseAddExpenseForm}
        budgets={budgets}
        handleAddExpense={handleAddExpense}
      />

      <ViewExpenseForm
        budgetId={selectedBudgetId}
        expenses={expenses}
        budgets={budgets}
        deleteBudget={handleDeleteBudget}
        deleteExpense={handleDeleteExpense}
        handleClose={() => setSelectedBudgetId(null)}
      />
    </>
  );
};

export default Budget;
