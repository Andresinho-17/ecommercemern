import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const Pago = () => {
  const stripe = useStripe(); // Accede al objeto stripe
  const elements = useElements(); // Accede al objeto elements
  const location = useLocation(); // Obtiene la ubicación actual para obtener el totalPrice
  const totalPrice = location.state?.totalPrice || 0; // Obtiene el totalPrice de la ubicación, si está disponible

  // Manejador para enviar el formulario y procesar el pago
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Verifica si stripe y elements están disponibles
    if (!stripe || !elements) {
      return;
    }

    // Obtiene la referencia al elemento de tarjeta
    const cardElement = elements.getElement(CardElement);

    // Crea el método de pago usando Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // Maneja los errores si ocurre alguno durante la creación del método de pago
    if (error) {
      console.error('Error al crear el método de pago:', error);
    } else {
      console.log('Método de pago creado:', paymentMethod);
      // Aquí puedes enviar paymentMethod.id y otros datos a tu backend para completar el pago
    }
  };

  return (
    <div className="pago-container">
      <h1>Total a pagar: ${totalPrice}</h1>
      <form onSubmit={handleSubmit}>
        {/* Componente de Stripe para el formulario de tarjeta */}
        <CardElement />
        {/* Botón de submit para enviar el formulario */}
        <button type="submit" disabled={!stripe}>Pagar</button>
      </form>
    </div>
  );
};

export default Pago;
