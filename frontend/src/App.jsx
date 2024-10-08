import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home, Signin, Signup, Profile, About } from './pages';
import { Navbar } from './components';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
