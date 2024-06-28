import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/Admin";
import Item from "./pages/Cadastro_Item/CadastroItem";
import Mensagem from "./pages/Mensagem/Mensagem";
import CadastroItem from "./pages/Cadastro_Item/CadastroItem";
import RecuperarItem from "./pages/Recuperar_Item";
import Perfil from "./pages/Perfil";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/item" element={<Item />} />
        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/cadastroItem" element={<CadastroItem />} />
        <Route path="/recuperarItem" element={<RecuperarItem />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
