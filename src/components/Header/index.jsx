import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Menu = () => {
  const navigate = useNavigate();

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
          onClick={() => handleNavigation("/admin")}
        >
          <i className="pi pi-fw pi-user"></i> Perfil
        </li>
        <li className={styles.navItem} onClick={() => handleNavigation("/")}>
          <i className="pi pi-fw pi-power-off"></i> Sair
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
