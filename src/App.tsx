import React, {useEffect} from 'react';
import './App.css';
import Converter from "./components/Converter";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Rates from "./components/Rates";
import {PrivateRoute} from "./components/PrivatRoute";
import {fetchCurrencies} from "./store/action/currencies";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCurrencies())
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Converter/>} />
                <Route path='/rates/*' element={<Rates/>} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;
