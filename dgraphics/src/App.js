import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AddAddress from './components/AddAddress';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <h1>Welcome to D-Graphics</h1>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-address' element={<AddAddress />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
