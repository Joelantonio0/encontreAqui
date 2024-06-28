import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const [nivelAcesso, setNivelAcesso] = useState();
  useEffect(() => {
    console.log("Dados da sessão:", sessionData.dados.fk_nivel);
    setNivelAcesso(sessionData.dados.fk_nivel);
  });
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li
          className={styles.navItem}
          style={{ marginRight: "250px" }}
          onClick={() => handleNavigation("/home")}
        >
          <h1>
            Encontre<span>Aqui</span>
          </h1>
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/home")}
        >
          <i className="pi pi-fw pi-home"></i> Home
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/recuperarItem")}
        >
          <i className="pi pi-fw pi-minus-circle"></i> Recuperar Item Perdido
        </li>
        <li
          className={`${styles.navItem} ${styles.dropdown}`}
          onClick={() => handleNavigation("/cadastroItem")}
        >
          <i className="pi pi-fw pi-exclamation-circle"></i> Reportar Perda
        </li>
        <li
          className={styles.navItem}
          onClick={() => {
            if (nivelAcesso == 1) handleNavigation("/admin");
            else handleNavigation("/perfil");
          }}
        >
          <i className="pi pi-fw pi-user"></i> Perfil
        </li>
        <li
          className={styles.navItem}
          onClick={() => {
            localStorage.removeItem("sessionData");
            handleNavigation("/");
          }}
        >
          <i className="pi pi-fw pi-power-off"></i> Sair
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
