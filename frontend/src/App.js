import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer />
      <Header/>
      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
