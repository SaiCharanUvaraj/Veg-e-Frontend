import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import VegetableItems from './pages/VegetableItems';
import FruitItems from './pages/FruitItems';
import DairyItems from './pages/DairyItems';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/home' element={<Home />} />
          <Route path='/vegetables' element={<VegetableItems />} />
          <Route path='/fruits' element={<FruitItems />} />
          <Route path='/dairies' element={<DairyItems />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App