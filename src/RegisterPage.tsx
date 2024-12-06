import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameTcha } from './components/game-tcha/GameTcha';
import GameRoute from './GameRoute'; // Ensure the file name and export match
import { setSharedVariable,getSharedVariable } from "./AppContext";

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface RegisterPageProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ users, setUsers }) => {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [captcha, setCaptcha] = useState<string | null>("show");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    if (users.some((user) => user.email === form.email)) {
      setErrorMessage("Un utilisateur avec cet email existe déjà !");
      return;
    }

    const newUser = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    };

    setUsers([...users, newUser]);
    setSuccessMessage("Compte créé avec succès !");
    setTimeout(() => navigate("/login"), 2000);
  };
  const sharedData = getSharedVariable();

  const handleGoToLogin = () => {
    navigate("/login");
  };
  if(sharedData==="showCaptcha"){
    return (<GameRoute   ></GameRoute>)
  }
else {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Inscription</h1>

        {errorMessage && (
          <div className="flex items-center justify-between bg-red-500 text-white px-4 py-2 rounded mb-4">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        )}
        {successMessage && (
          <div className="flex items-center justify-between bg-green-500 text-white px-4 py-2 rounded mb-4">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
              Nom complet
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:outline-none transition duration-300"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Vous avez déjà un compte ?{" "}
          <button
            onClick={handleGoToLogin}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );}
};
