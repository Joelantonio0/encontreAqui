import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/Admin";
import Item from "./pages/Cadastro_Item/CadastroItem";
import Mensagem from "./pages/Mensagem/Mensagem";
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
