import React, { useEffect, useState } from "react";
import LineChart from "./LineChart"; // ✅ chemin correct
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [minIncome, setMinIncome] = useState(null);
  const [maxIncome, setMaxIncome] = useState(null);
  const [minExpense, setMinExpense] = useState(null);
  const [maxExpense, setMaxExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Vous devez vous connecter pour accéder au Dashboard.");
      navigate("/signin");
    }

    if (storedIncomes.length > 0) {
      const amounts = storedIncomes.map((i) => parseFloat(i.amount));
      setMinIncome(Math.min(...amounts));
      setMaxIncome(Math.max(...amounts));
    }

    if (storedExpenses.length > 0) {
      const amounts = storedExpenses.map((e) => parseFloat(e.amount));
      setMinExpense(Math.min(...amounts));
      setMaxExpense(Math.max(...amounts));
    }
  }, []);

  return (
    <div className="bg-red-50  my-2 h-screen rounded-xl flex">
      <div className="w-full p-5">
        <h1 className="text-[1.5rem] font-bold">Dashboard</h1>
        <div className="flex flex-col w-full mt-7 gap-6">
          <div
            className="flex  h-[350px] bg-white p-2 shadow-lg rounded-lg"
            id="graphe"
          >
            <LineChart />
          </div>
          <div className="flex w-1/2 bg-white shadow-lg flex-col gap-4 p-4">
            <div id="mimain" className="text-black text-sm">
              <p>
                <strong>Min revenu :</strong> {minIncome ?? "N/A"} F CFA
              </p>
              <p>
                <strong>Max revenu :</strong> {maxIncome ?? "N/A"} F CFA
              </p>
            </div>
            <div id="mimaex" className="text-black text-sm">
              <p>
                <strong>Min dépense :</strong> {minExpense ?? "N/A"} F CFA
              </p>
              <p>
                <strong>Max dépense :</strong> {maxExpense ?? "N/A"} F CFA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
