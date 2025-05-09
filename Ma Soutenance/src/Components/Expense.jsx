import React, { useState, useEffect } from "react";

const Expense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      try {
        const parsedExpenses = JSON.parse(storedExpenses);
        if (Array.isArray(parsedExpenses)) {
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error("Erreur lors du parsing des dépenses :", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (title && amount && date && type) {
      const newExpense = {
        id: Date.now(),
        title,
        amount,
        date,
        type,
        reference,
      };
      setExpenses([...expenses, newExpense]);
      setTitle("");
      setAmount("");
      setDate("");
      setType("");
      setReference("");
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="bg-red-50 my-2 h-screen rounded-xl flex">
      <div className="w-1/2 p-5 ">
        <h1 className="text-black font-bold text-[1.5rem]">Expenses</h1>
        <h2 className="text-center text-black text-[1rem] p-5 mt-10 font-semibold rounded-lg bg-white shadow-xl">
          Expense Total :{" "}
          {expenses
            .reduce(
              (total, expense) => total + parseFloat(expense.amount || 0),
              0
            )
            .toFixed(2)}{" "}
          F CFA
        </h2>

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-[0.5rem] outline-white p-2 my-2 text-sm w-full shadow-sm"
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="outline-[0.5rem] outline-white p-2 my-2 text-sm w-full shadow-sm"
        />
        <input
          type="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 my-2 w-full shadow-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 my-2 shadow-sm"
        >
          <option value="">-- Sélectionnez un type de dépense --</option>
          <option value="loyer">Loyer</option>
          <option value="factures">Factures</option>
          <option value="courses">Courses</option>
          <option value="transport">Transport</option>
          <option value="santé">Santé</option>
          <option value="loisirs">Loisirs</option>
          <option value="autres">Autres</option>
        </select>
        <textarea
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          rows="4"
          cols="40"
          placeholder="Add a reference"
          className="text-sm w-full p-2"
        ></textarea>
        <button
          onClick={handleAddExpense}
          className="py-3 px-8 text-black font-semibold rounded-full my-6 hover:scale-110 bg-red-200"
        >
          Add
        </button>
      </div>

      <div id="Expense" className="w-1/2 p-5 overflow-y-auto">
        <h3 className="font-bold mb-4 mt-16 text-center text-lg ">
          List of expenses :
        </h3>
        {expenses.map((expense) => (
          <div key={expense.id} className="bg-white rounded-md p-3 shadow mb-3">
            <p>
              <strong>{expense.title}</strong> - {expense.amount} €
            </p>
            <p>
              {expense.date} | {expense.type}
            </p>
            <p>{expense.reference}</p>
            <button
              onClick={() => handleDeleteExpense(expense.id)}
              className="text-red-600 mt-2 text-sm underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
