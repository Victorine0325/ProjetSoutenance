import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Income from "./Components/Income";
import Expense from "./Components/Expense";
import Register from "./Components/Register";
import SignIn from "./Components/SignIn";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
