# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

// J'ai un dossier src dans lequel j'ai créé les fichiers App.jsx, App.css, index.css, main.jsx et un dossier Components dans lequel j'ai les fichiers Navbar.jsx, Dashboard.jsx, Income.jsx, Expense.jsx, Register.jsx, SignIn.jsx. Voici le code de mon Dashboard.jsx import React, { useState, useEffect } from "react";

const Dashboard = () => {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [date, setDate] = useState("");
const [type, setType] = useState("");
const [reference, setReference] = useState("");
const [incomes, setIncomes] = useState([]);

useEffect(() => {
const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
if (storedIncomes) {
setIncomes(storedIncomes);
}
}, []);

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
setIncomes([...incomes, newIncome]);
// Réinitialiser les champs
setTitle("");
setAmount("");
setDate("");
setType("");
setReference("");
}
};

const handleDeleteIncome = (id) => {
setIncomes(incomes.filter((income) => income.id !== id));
};

return (

<div className="bg-pink-50 my-2 h-screen rounded-xl flex">
<div className="w-1/2 p-5">
<h1 className="text-black font-bold text-[1.5rem]">Incomes</h1>
<h2 className="text-center text-black text-[1rem] p-5 font-semibold rounded-lg bg-white shadow-xl">
Total Income:
</h2>

        <input
          type="text"
          placeholder="Income Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-[0.5rem] outline-white  p-2 my-2 text-sm w-full shadow-sm "
        />
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="outline-[0.5rem] outline-white p-2 my-2 text-sm w-full shadow-sm "
        />
        <input
          type="date"
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
          className="py-3 px-8 text-black font-semibold rounded-full my-6 hover:scale-110 bg-pink-200 "
        >
          Ajouter
        </button>
      </div>

      <div id="Income" className="w-1/2 p-5 overflow-y-auto ">
        <h3 className="font-bold mb-4 text-lg">Liste des revenus :</h3>
        {incomes.map((income) => (
          <div key={income.id} className="bg-white rounded-md p-3 shadow mb-3 ">
            <p>
              <strong>{income.title}</strong> - {income.amount} €
            </p>
            <p>
              {income.date} | {income.type}
            </p>
            <p>{income.reference}</p>
            <button
              onClick={() => handleDeleteIncome(income.id)}
              className="text-red-600 mt-2 text-sm underline"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>

);
};

export default Dashboard; je veux que les choses que je vais écrire dans les input soient affichées dans la div dont id="Income" et lorsque je vais actualiser mon site, qu'elles ne s'effacent jamais à moins que je clique sur le boutton 'Supprimer'. Comment faire ?

Je veux que le total de tous les montants que je vais insérer s'affiche devant le texte qui est dans h2
