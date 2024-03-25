import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
function App() {
    return (
        <div>
            <BrowserRouter>
                
                <Routes>
                <Route path="/login" exact element={<Login/>} />
                <Route path="/register" exact element={<Register/>} />
                <Route path='/home' exact element={<Home/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default App