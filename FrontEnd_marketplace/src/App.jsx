import './App.css'
import React from 'react';
import LoginPage from './pages/login.jsx';
import NotFound from './pages/notfound.jsx'
import Register from './pages/register.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
    <>
    <BrowserRouter>
      <Routes>        
        <Route path='/login' element={<LoginPage />  } />
        <Route path='/register' element={<Register />  } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
        
    </>
  )
}

export default App;
