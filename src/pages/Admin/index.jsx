import React, { useState } from "react";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/dashboard";
import GestaoItens from "../../components/AdminComponents/GestaoItens";
import GestaoUsuarios from "../../components/AdminComponents/GestaoUsuarios";
import Relatorios from "../../components/AdminComponents/Relatorios";
import Categorias from "../../components/AdminComponents/Categorias";
function Admin() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  const handleNavigation = (path) => {
    setCurrentView(path);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <Dashboard />
          </>
        );
      case "lost-items":
        return (
          <>
            <GestaoItens />
          </>
        );
      case "categorias":
        return (
          <>
            <Categorias />
          </>
        );
      case "found-items":
        return <></>;
      case "users":
        return (
          <>
            <GestaoUsuarios />
          </>
        );
      case "report-lost":
        return (
          <>
            <h1>Reportar item perdido</h1>
            <p>Formulário</p>
          </>
        );
      case "relatorios":
        return (
          <>
            <Relatorios />
          </>
        );
      case "profile":
        return (
          <>
            <h1>Informações do admin</h1>
            <p>Informações sobre o administrador</p>
          </>
        );
      default:
        return (
          <>
            <h1>Dashboard Resumo</h1>
            <div className={styles.dashboardCards}>
              <div className={styles.card}>
                <h2>Itens perdidos</h2>
                <p>Número de itens perdidos: 120</p>
              </div>
              <div className={styles.card}>
                <h2>Itens encontrados</h2>
                <p>Número de itens encontrados: 80</p>
              </div>
              <div className={styles.card}>
                <h2>Usuários activos</h2>
                <p>Número de usuários activos:300</p>
              </div>
              <div className={styles.card}>
                <h2>Actividades recentes</h2>
                <p>Ver as últimas recuperações e ações feitas por usuários.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container-admin">
      <Header />
      <div className={styles.contentAdmin}>
        <div className={styles.leftSide}>
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("dashboard")}
              >
                <i className="pi pi-fw pi-home"></i> Home
              </li>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("lost-items")}
              >
                <i className="pi pi-fw pi-list"></i> Gestão de Itens
              </li>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("categorias")}
              >
                <i className="pi pi-fw pi-list"></i> Categorias
              </li>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("users")}
              >
                <i className="pi pi-fw pi-users"></i> Gestão de Usuários
              </li>
              <li
                className={`${styles.navItem} ${styles.dropdown}`}
                onClick={() => handleNavigation("relatorios")}
              >
                <i className="pi pi-fw pi-exclamation-circle"></i> Relatórios
              </li>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("profile")}
              >
                <i className="pi pi-fw pi-user"></i> Perfil
              </li>
              <li
                className={styles.navItem}
                onClick={() => handleNavigation("login")}
              >
                <i className="pi pi-fw pi-power-off"></i> Sair
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.rightSide}>{renderContent()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
