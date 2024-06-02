import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
