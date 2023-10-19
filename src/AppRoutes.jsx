import React, { useContext } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js";
import TelaCadastroExemplar from "./interfaces/TelaFormExemplar.jsx";
import TelaDevolucao from "./interfaces/TelaCadastroDevolucao.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import { AuthProvider, AuthContext } from "./contexts/auth.jsx"

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }
        return children;
    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/" element={<Private><TelaMenu /> </Private>} />
                    <Route exact path ="/exemplar" element={<Private><TelaCadastroExemplar /></Private>} />
                    <Route exact path ="/devolucao" element={<Private><TelaDevolucao /></Private>} />
                    <Route exact path="*" element={<Tela404 />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
