import './App.css'
import React from 'react';
import Userlogin from './pages/userlogin.jsx';
/* import LoginPage from './pages/login.jsx' */
import NotFound from './pages/notfound.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/login' element={<LoginPage />  } /> */}
        <Route path='/login' element={<Userlogin />  } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
        
    </>
  )
}

export default App;
