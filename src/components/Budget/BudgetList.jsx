import React from "react";
import BudgetCard from "./BudgetCard";

const BudgetList = ({
  budgets,
  handleFetchExpenses,
  handleShowAddExpenseForm,
  handleShowViewExpenseForm,
  expenses,
}) => {
  return (
    <div>
      {budgets.map((budget) => {
        const totalSpent = expenses.reduce((acc, expense) => {
          if (expense.budget_id === budget.id) {
            return acc + parseFloat(expense.amount);
          }
          return acc;
        }, 0);

        return (
          <div key={budget.id}>
            <BudgetCard
              name={budget.budget_name}
              amount={totalSpent}
              max={budget.maximum_spending}
              gray={false}
              onAddExpenseClick={() => handleFetchExpenses(budget.id)}
              onViewExpensesClick={() => handleShowViewExpenseForm(budget.id)}
              openAddExpenseClick={() => handleShowAddExpenseForm()}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;
