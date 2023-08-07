import React from "react";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = ({ expenses, budgets }) => {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  const totalMax = budgets.reduce(
    (total, budget) => total + parseFloat(budget.maximum_spending),
    0
  );

  if (totalMax === 0) return null;

  return (
    <BudgetCard
      amount={totalExpenses}
      name="Total"
      gray
      max={totalMax}
      hideButton
    />
  );
};

export default TotalBudgetCard;
