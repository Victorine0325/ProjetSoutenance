import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length === 0) {
      setMessage("Aucun compte n’existe encore. Veuillez vous inscrire.");
      setTimeout(() => {
        navigate("/register"); // ✅ Redirection propre avec React Router
      }, 2000);
      return;
    }

    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      setMessage("Connexion réussie !");
      setEmail(""); // ✅ On vide les champs uniquement ici
      setPassword("");
      window.location.href = "/";
    } else {
      setMessage("Email ou mot de passe incorrect.");
      // ❌ Ne vide pas les champs pour permettre à l'utilisateur de corriger
    }
  };
  return (
    <div className="bg-pink-50 my-2 h-screen rounded-xl flex flex-col">
      <h1 className="text-[1.5rem] font-bold ml-10 mt-12">Sign In</h1>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col h-1/2 w-1/2 ml-60 mt-28 gap-4"
      >
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
          Sign in
        </button>
        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Sign;
