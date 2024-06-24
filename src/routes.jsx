import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/Admin";
import Item from "./pages/Cadastro_Item/CadastroItem"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/item" element={<Item/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
