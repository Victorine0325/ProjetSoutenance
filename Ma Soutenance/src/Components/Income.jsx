import React, { useState, useEffect } from "react";

const Income = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [incomes, setIncomes] = useState([]);

  // Chargement initial depuis le localStorage
  useEffect(() => {
    const storedIncomes = localStorage.getItem("incomes");
    if (storedIncomes) {
      try {
        const parsedIncomes = JSON.parse(storedIncomes);
        if (Array.isArray(parsedIncomes)) {
          setIncomes(parsedIncomes);
        }
      } catch (error) {
        console.error("Erreur lors du parsing des revenus :", error);
      }
    }
  }, []);

  // Sauvegarde à chaque changement de la liste des revenus
  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const handleAddIncome = () => {
    if (title && amount && date && type) {
      const newIncome = {
        id: Date.now(),
        title,
        amount,
        date,
        type,
        reference,
      };
      const updatedIncomes = [...incomes, newIncome];
      setIncomes(updatedIncomes);

      // Réinitialiser les champs
      setTitle("");
      setAmount("");
      setDate("");
      setType("");
      setReference("");
    }
  };

  const handleDeleteIncome = (id) => {
    const updatedIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(updatedIncomes);
  };

  return (
    <div className="bg-pink-50 my-2 h-screen rounded-xl flex">
      <div className="w-1/2 p-5">
        <h1 className="text-black font-bold text-[1.5rem]">Incomes</h1>
        <h2 className="text-center text-black text-[1rem] p-5 mt-10 font-semibold rounded-lg bg-white shadow-xl">
          Total Income: <span> </span>
          {incomes
            .reduce(
              (total, income) => total + parseFloat(income.amount || 0),
              0
            )
            .toFixed(2)}{" "}
          F CFA
        </h2>

        <input
          type="text"
          placeholder="Income Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-[0.5rem] outline-white p-2 my-2 text-sm w-full shadow-sm"
        />
        <input
          type="number"
          placeholder="Income Amount"
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
          <option value="">-- Sélectionnez un type de revenu --</option>
          <option value="salaire">Salaire</option>
          <option value="prime">Prime / Bonus</option>
          <option value="freelance">Revenus indépendants / Freelance</option>
          <option value="pension">Pension / Retraite</option>
          <option value="allocations">Allocations sociales</option>
          <option value="loyers">Revenus locatifs</option>
          <option value="placements">Revenus de placements</option>
          <option value="vente">Ventes</option>
          <option value="dons">Dons reçus</option>
          <option value="autres">Autres</option>
        </select>
        <textarea
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          rows="4"
          cols="40"
          placeholder="Add reference"
          className="text-sm w-full p-2"
        ></textarea>
        <button
          onClick={handleAddIncome}
          className="py-3 px-8 text-black font-semibold rounded-full my-6 hover:scale-110 bg-pink-200"
        >
          Add
        </button>
      </div>

      <div id="Income" className="w-1/2 p-5 overflow-y-auto">
        <h3 className="font-bold mb-4 mt-16 text-center text-lg">
          List of incomes :
        </h3>
        {incomes.map((income) => (
          <div key={income.id} className="bg-white rounded-md p-3 shadow mb-3">
            <p>
              <strong>{income.title}</strong> - {income.amount} F CFA
            </p>
            <p>
              {income.date} | {income.type}
            </p>
            <p>{income.reference}</p>
            <button
              onClick={() => handleDeleteIncome(income.id)}
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

export default Income;
