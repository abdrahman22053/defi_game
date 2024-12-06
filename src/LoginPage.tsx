import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSharedVariable,getSharedVariable } from "./AppContext";


interface User {
  email: string;
  password: string;
}

interface LoginPageProps {
  users: User[];
  setIsAuthenticated: (value: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const userExists = users.some(
      (user) => user.email === form.email && user.password === form.password
    );
    setSharedVariable("showCaptcha")
    if (userExists) {
      setIsAuthenticated(true);
      navigate("/welcome");
    } else {
      setErrorMessage("Identifiants invalides !");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Connexion</h1>

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

        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:outline-none transition duration-300"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Vous n'avez pas de compte ?{" "}
          <button
            onClick={handleGoToRegister}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
};
