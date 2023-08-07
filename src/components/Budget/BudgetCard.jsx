import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  openAddExpenseClick,
  hideButton,
  onViewExpensesClick,
}) => {
  // Convert amount and max to numbers
  const numericAmount = parseInt(amount);
  const numericMax = parseInt(max);

  const classNames = [];
  if (numericAmount > numericMax) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  const getProgressBarVariant = () => {
    const ratio = numericAmount / numericMax;
    if (ratio < 0.5) return "primary";
    else if (ratio < 0.75) return "warning";
    return "danger";
  };

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(numericAmount)}{" "}
            <span className="text-muted fs-6 ms-1">
              /{numericMax && currencyFormatter.format(numericMax)}
            </span>
          </div>
        </Card.Title>

        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant()}
          min={0}
          max={numericMax}
          now={numericAmount}
        />

        {!hideButton && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={openAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
