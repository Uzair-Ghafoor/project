import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home, Signin, Signup, Profile, About } from './pages';
import { Navbar } from './components';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <Signup />} />
        <Route path='/signin' element={currentUser ? <Home /> : <Signin />} />
        <Route path='/signup' element={currentUser ? <Home /> : <Signup />} />
        <Route
          path='/profile'
          element={currentUser ? <Profile /> : <Signin />}
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
};

export default App;
