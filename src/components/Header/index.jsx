import React from "react";
import styles from "./Header.module.css";
import { Button } from "primereact/button";

function Header() {
  return (
    <header className={styles.header}>
      <span>EncontreAqui</span>
      <nav style={{ display: "flex", gap: "10px" }}>
        <div className={styles.barra}>
          <input
            type="text"
            name=""
            placeholder="Pesquise por um item"
            id=""
            style={{
              border: "none",
              borderRight: "1px solid",
              padding: "8px 15px",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            }}
          />
          <Button
            icon="pi pi-search"
            style={{
              border: "none",
              padding: "1.1px",
              width: "20px",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
            className="p-button-secondary"
          />
        </div>
        <a href="">Explorar</a>
        <a href="">Ver Itens</a>
        <a href="">Contacte-nos</a>
        <a href="">Criar conta</a>
        <a href="">Entrar</a>
      </nav>
    </header>
  );
}

export default Header;
