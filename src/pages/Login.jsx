import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials with an API
    login({ username: credentials.username });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
            alt="Logo"
            className="h-20 w-auto"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600">Authentification</h2>
          <p className="mt-2 text-center  text-gray-600 text-2xl-sm font-bold">Merci de s'authentifier !</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                  <FaUser />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Entrer votre nom d'utilisateur"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3  flex items-center text-gray-500">
                  <TbLockPassword />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Entrer votre mot de passe"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

          
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              S'authentifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;