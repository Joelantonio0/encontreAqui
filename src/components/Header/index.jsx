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
        <li className={styles.navItem} style={{ marginRight: "140px" }}>
          <h1>
            Encontre<span>Aqui</span>
          </h1>
        </li>
        <li className={styles.navItem} onClick={() => handleNavigation("/")}>
          <i className="pi pi-fw pi-home"></i> Home
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/lost-items")}
        >
          <i className="pi pi-fw pi-search"></i> Itens Perdidos
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/found-items")}
        >
          <i className="pi pi-fw pi-check-square"></i> Encontrar Itens
        </li>
        <li className={`${styles.navItem} ${styles.dropdown}`}>
          <i className="pi pi-fw pi-exclamation-circle"></i> Reportar
          <ul className={styles.dropdownContent}>
            <li
              className={styles.dropdownItem}
              onClick={() => handleNavigation("/report-lost")}
            >
              <i className="pi pi-fw pi-minus-circle"></i> Recuperar Item
              Perdido
            </li>
            <li
              className={styles.dropdownItem}
              onClick={() => handleNavigation("/report-found")}
            >
              <i className="pi pi-fw pi-plus-circle"></i> Reportar Item
              Encontrado
            </li>
          </ul>
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/profile")}
        >
          <i className="pi pi-fw pi-user"></i> Perfil
        </li>
        <li
          className={styles.navItem}
          onClick={() => handleNavigation("/login")}
        >
          <i className="pi pi-fw pi-power-off"></i> Sair
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
