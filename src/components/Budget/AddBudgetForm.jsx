import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";

const AddBudgetForm = ({ show, handleClose, handleAddBudget }) => {
  const [budgetName, setBudgetName] = useState("");
  const [maximumSpending, setMaximumSpending] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetData = {
      budget_name: budgetName,
      maximum_spending: parseFloat(maximumSpending),
    };
    handleAddBudget(budgetData);
    setBudgetName("");
    setMaximumSpending("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="budgetName"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              id="maximumSpending"
              value={maximumSpending}
              onChange={(e) => setMaximumSpending(e.target.value)}
              min={0}
              step={0.01}
            />
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

export default AddBudgetForm;
