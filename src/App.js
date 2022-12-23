import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    Route,
    RouterProvider,
    createRoutesFromElements
} from 'react-router-dom'

// pages
import Headpage from './pages/Headpage';
import CoinDetails from './pages/CoinDetails'

// Routes
const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/' element={<Headpage />}>
            <Route path='/:id' element={<CoinDetails />} />
        </Route>

    )
)

// Root App component
const App = () => {
    return (
        <div style={{backgroundColor: '#161b22' , width: '100%' , minHeight: '100vh'}}>
            <RouterProvider router={router} />
        </div>
    )
}

export default App