import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!email) {
      setMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    try {
        const response = await fetch('/api/forgot-password', {
                 method: 'post',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ email }),
               });
               const data = await response.json();
               if (response.ok) {
                 setMessage(data.message);
               } else {
                 setMessage(data.error);
               }

      
      setMessage(`Se ha enviado un correo de recuperación a ${email}.`);
      setEmail('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMessage('Hubo un problema al procesar tu solicitud. Por favor intenta más tarde.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Volver al inicio de sesión
            </Link>
          </div>
          {message && <p className="text-sm text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
