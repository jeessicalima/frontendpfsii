import React, { useContext } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js";
import TelaCadastroExemplar from "./interfaces/TelaFormExemplar.jsx";
import TelaDevolucao from "./interfaces/TelaCadastroDevolucao.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/frontendpfsii" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="/" element={<TelaMenu />}></Route>
          <Route path="/exemplar" element={<TelaCadastroExemplar/>}></Route>
          <Route path="/devolucao" element={<TelaDevolucao />}></Route>
          <Route path="*" element={<Tela404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
