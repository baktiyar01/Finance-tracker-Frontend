import React, { useState } from "react";
import axios from "axios";

const Budget = () => {
  const [budgetName, setBudgetName] = useState("");
  const [maximumSpending, setMaximumSpending] = useState("");

  const handleAddBudget = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend to add the budget
      const response = await axios.post("/budget/addBudget", {
        budget_name: budgetName,
        maximum_spending: maximumSpending,
      });

      console.log("Budget added successfully:", response.data);
      // Reset the form
      setBudgetName("");
      setMaximumSpending("");
    } catch (error) {
      console.error("Failed to add budget:", error);
    }
  };

  return (
    <div>
      <h2>Add Budget</h2>
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
    </div>
  );
};

export default Budget;
