import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/home";
import ManualScreen from "../pages/manual/manual";
import Chat from "../pages/chat/chat";
import Solicitacao from "../pages/solicitação";

const RoutesApp = () => {
    const login = !!localStorage.getItem("usuario");
    if (!login) {
        // Se o usuário não estiver presente, redirecione para a tela de login
        window.location.href = "/login";
        return <h1>Carregando...</h1>
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="*" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/associado" element={<Home />} />
                    <Route exact path="/cobranca" element={<Home />} />
                    <Route exact path="/vendas" element={<Home />} />
                    <Route exact path="/financeiro" element={<Home />} />
                    <Route exact path="/manual-sistema" element={<ManualScreen />} />
                    <Route exact path="/chat" element={<Chat />} />
                    <Route exact path="/solicitacao" element={<Solicitacao />} />
                </Routes>
            </BrowserRouter>
        );
    }
};

export default RoutesApp;