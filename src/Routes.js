import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";

const RoutesApp = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="*" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/associado" element={<Home />} />
            <Route exact path="/vendas" element={<Home />} />
            <Route exact path="/financeiro" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;