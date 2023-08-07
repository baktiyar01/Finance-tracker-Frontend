import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";

const AddExpenseForm = ({ show, handleClose, budgets, handleAddExpense }) => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleAddExpenseFormSubmit = (e) => {
    e.preventDefault();

    const selectedBudgetObj = budgets.find(
      (budget) => budget.id === parseInt(selectedBudget)
    );
    if (!selectedBudgetObj) {
      console.error("Invalid budget ID");
      return;
    }

    const expenseData = {
      expense_name: expenseName,
      amount: parseFloat(amount),
      date,
      budget_id: selectedBudget,
    };
    handleAddExpense(expenseData);
    setSelectedBudget("");
    setExpenseName("");
    setAmount("");
    setDate("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleAddExpenseFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              id="budgetId"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
            >
              <option value="">Select a budget</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.budget_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content content-end">
            <Button type="submit" name="submit" variant="primary">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseForm;
