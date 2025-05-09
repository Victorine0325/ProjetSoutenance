import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-gray-400" : "bg-gray-200";

  return (
    <div className="w-1/5 h-screen bg-red-50 m-5 rounded-xl">
      <div className="flex flex-col gap-3 ml-6 pt-8">
        <Link to="/" className={`p-2 w-3/4 rounded-xl ${isActive("/")}`}>
          Dashboard
        </Link>
        <Link
          to="/income"
          className={`p-2 w-3/4 rounded-xl ${isActive("/income")}`}
        >
          Income
        </Link>
        <Link
          to="/expense"
          className={`p-2 w-3/4 rounded-xl ${isActive("/expense")}`}
        >
          Expense
        </Link>
        <Link
          to="/register"
          className={`p-2 w-3/4 rounded-xl ${isActive("/register")}`}
        >
          Register
        </Link>
        <Link
          to="/signin"
          className={`p-2 w-3/4 rounded-xl ${isActive("/signin")}`}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
