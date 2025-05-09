import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Vérifie si un champ est vide
    if (!name || !surname || !email || !password) {
      setMessage("Tous les champs doivent être remplis.");
      return;
    }

    const newUser = { name, surname, email, password };

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 🔎 Vérifie si l’e-mail existe déjà
    const emailExists = storedUsers.some((user) => user.email === email);

    if (emailExists) {
      setMessage("Cet e-mail est déjà utilisé. Veuillez en choisir un autre.");
      return; // ⛔ Stoppe ici si doublon
    }

    // ✅ Si tout est bon, enregistre le nouvel utilisateur
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    localStorage.setItem("isLoggedIn", "true");

    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setMessage(""); // ✅ Efface le message d'erreur si tout va bien

    navigate("/dashboard");
  };

  return (
    <div className="bg-pink-50 my-2 h-screen rounded-xl flex flex-col">
      <h1 className="text-[1.5rem] font-bold ml-10 mt-12">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-1/2 w-1/2 ml-60 mt-28 gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="bg-white p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="bg-white p-3"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-white p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter a password"
          className="bg-white p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 p-3 bg-pink-200 w-1/3 font-semibold rounded-full"
        >
          Send
        </button>
        {message && (
          <p className="text-center text-sm text-red-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
