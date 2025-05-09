import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Dates combinées, triées, sans doublons
    const allDates = [
      ...new Set([...storedIncomes, ...storedExpenses].map((i) => i.date)),
    ].sort();

    // Crée des objets {date: montant}
    const incomeMap = Object.fromEntries(
      storedIncomes.map((i) => [i.date, parseFloat(i.amount)])
    );
    const expenseMap = Object.fromEntries(
      storedExpenses.map((e) => [e.date, parseFloat(e.amount)])
    );

    // Données finales sur chaque date
    const incomeData = allDates.map((date) => incomeMap[date] || 0);
    const expenseData = allDates.map((date) => expenseMap[date] || 0);

    // Valeurs min et max globales pour l'échelle Y
    const allValues = [...incomeData, ...expenseData];
    const minAmount = Math.min(...allValues);
    const maxAmount = Math.max(...allValues);

    setChartData({
      labels: allDates,
      datasets: [
        {
          label: "Revenus",
          data: incomeData,
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          pointBackgroundColor: "rgb(34, 197, 94)",
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: "Dépenses",
          data: expenseData,
          borderColor: "rgb(239, 68, 68)", // Rouge
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          pointBackgroundColor: "rgb(239, 68, 68)",
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: minAmount,
          max: maxAmount,
          title: {
            display: true,
            text: "Montant (F CFA)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
