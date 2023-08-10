import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
import { currencyFormatter } from "./Budget/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../provider/authProvider";
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement
);
const Analytics = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { token } = useAuth();
  const userId = jwt_decode(token).id;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    fetchExpenses();
  }, []);
  // Calculate data for the pie chart
  const pieChartData = budgets.map((budget) => {
    const totalSpent = expenses.reduce((acc, expense) => {
      if (expense.budget_id === budget.id) {
        return acc + parseFloat(expense.amount);
      }
      return acc;
    }, 0);

    const percentSpent = (totalSpent / budget.maximum_spending) * 100;
    return {
      label: budget.budget_name,
      data: percentSpent,
    };
  });

  // Calculate data for the bar chart
  const barChartData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    if (date >= startDate && date <= endDate) {
      const month = date.getMonth(); // 0-11
      const expenseAmount = parseFloat(expense.amount);

      if (!acc[month]) {
        acc[month] = { month, total: 0, count: 0 };
      }

      acc[month].total += expenseAmount;
      acc[month].count++;
    }
    return acc;
  }, []);

  const barChartLabels = barChartData.map((data) =>
    new Date(0, data.month).toLocaleString("default", { month: "long" })
  );
  const barChartTotalData = barChartData.map((data) => data.total);
  const barChartAverageData = barChartData.map(
    (data) => data.total / data.count
  );

  // Pie Chart options
  const pieChartOptions = {
    legend: {
      position: "bottom",
    },
  };

  // Bar Chart options
  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ maxWidth: "600px" }}>
          <h3>Bar Chart: Total Expense and Daily Average by Month</h3>
          <Bar
            data={{
              labels: barChartLabels,
              datasets: [
                {
                  label: "Total Expense",
                  data: barChartTotalData,
                  backgroundColor: "#36A2EB",
                },
                {
                  label: "Daily Average",
                  data: barChartAverageData,
                  backgroundColor: "#FFCE56",
                },
              ],
            }}
            options={barChartOptions}
          />
        </div>
        <div style={{ maxWidth: "400px" }}>
          <h3>Pie Chart: Spend Percentage by Budget</h3>
          <Pie
            data={{
              labels: pieChartData.map((data) => data.label),
              datasets: [
                {
                  data: pieChartData.map((data) => data.data),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2"],
                },
              ],
            }}
            options={pieChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
