import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import SummaryApi from './common'; // Importa las URL y métodos de API desde el archivo common
import Context from './context'; // Importa el contexto que proporciona acceso global a los datos
import { useDispatch } from 'react-redux'; // Importa useDispatch para enviar acciones a Redux
import { setUserDetails } from './store/userSlice'; // Importa la acción setUserDetails desde el slice de usuario

function App() {
  const dispatch = useDispatch(); // Hook para enviar acciones de Redux
  const [cartProductCount, setCartProductCount] = useState(0); // Estado local para contar productos en el carrito
  const [totalPrice, setTotalPrice] = useState(0); // Estado local para almacenar el precio total

  // Función asincrónica para obtener los detalles del usuario
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json(); // Parsea la respuesta a JSON

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data)); // Envía los detalles del usuario al store de Redux
    }
  };

  // Función asincrónica para obtener la cantidad de productos en el carrito del usuario
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json(); // Parsea la respuesta a JSON

    setCartProductCount(dataApi?.data?.count); // Actualiza el estado de cartProductCount con el número de productos
  };

  // Función asincrónica para obtener el precio total de los productos en el carrito del usuario
  const fetchTotalPrice = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json(); // Parsea la respuesta a JSON

    if (dataApi.success) {
      // Calcula el precio total sumando el precio de cada producto multiplicado por su cantidad
      const total = dataApi.data.reduce((sum, product) => sum + product.quantity * product.productId.sellingPrice, 0);
      setTotalPrice(total); // Actualiza el estado de totalPrice con el precio total calculado
    }
  };

  // Hook useEffect para cargar los datos iniciales cuando el componente se monta
  useEffect(() => {
    fetchUserDetails(); // Obtiene los detalles del usuario
    fetchUserAddToCart(); // Obtiene la cantidad de productos en el carrito
    fetchTotalPrice(); // Obtiene el precio total de los productos en el carrito
  }, []); // El array vacío [] como segundo argumento significa que solo se ejecuta una vez al montar el componente

  return (
    <>
      {/* Proveedor de Contexto para proporcionar acceso global a los datos */}
      <Context.Provider value={{
        fetchUserDetails, // Función para obtener los detalles del usuario
        cartProductCount, // Cantidad de productos en el carrito
        fetchUserAddToCart, // Función para obtener la cantidad de productos en el carrito
        totalPrice // Precio total de los productos en el carrito
      }}>
        {/* Componente ToastContainer para mostrar notificaciones */}
        <ToastContainer position='top-center' />
        {/* Componente Header para la cabecera de la aplicación */}
        <Header />
        {/* Contenedor principal de la aplicación */}
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          {/* Outlet para renderizar las rutas hijas */}
          <Outlet />
        </main>
        {/* Componente Footer para el pie de página de la aplicación */}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

