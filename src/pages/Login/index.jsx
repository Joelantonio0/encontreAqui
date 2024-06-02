import React, { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  // Correção: Usando useState para inicializar o estado
  const [dadosFormulario, setDadosFormulario] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Obter os valores dos campos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("senha").value;
    console.log(username, password);

    // Fazer a solicitação POST para o backend
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao fazer login");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Faça algo com os dados do usuário logado, como redirecionar para outra página
      })
      .catch((error) => {
        console.error("Erro:", error);
        // Trate o erro, exiba uma mensagem de erro, etc.
      });
  };

  return (
    <div
      className="container-login"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <div
        style={{
          maxWidth: "100%",
          height: "50px",
          backgroundColor: "var(--primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Vaquinha Online
        </span>
      </div>
      <div className={styles.content_form}>
        <form action="">
          <label htmlFor="username">E-mail</label>
          <input
            type="email"
            name="username"
            id="username"
            placeholder="Insira seu e-mail ou username"
          />
          <label htmlFor="Senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Insira a senha"
          />
          <button
            type="submit"
            className={styles.button_login}
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
