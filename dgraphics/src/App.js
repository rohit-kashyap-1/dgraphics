import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <h1>Welcome to D-Graphics</h1>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
