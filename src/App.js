import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Routers from './config/Routers';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routers />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
