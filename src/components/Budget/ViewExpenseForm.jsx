import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";

const ViewExpenseForm = ({
  budgetId,
  expenses,
  budgets,
  deleteBudget,
  deleteExpense,
  handleClose,
}) => {
  const budget = budgets.find((b) => b.id === budgetId) || {
    name: "Uncategorized",
    id: null,
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budget_id === budgetId);
  };

  const budgetExpenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget.budget_name}</div>
            {budget.id !== null && (
              <Button
                onClick={() => {
                  deleteBudget(budget.id);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {budgetExpenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.expense_name}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => {
                  deleteExpense(expense.id);
                }}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpenseForm;
