import React from "react";
import styles from "./Cadastro.module.css";
function Cadastro() {
  const handleCadastroUsuario = (e) => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    console.log(username, email, password, confirmPassword);
    if (password == confirmPassword && email != "" && username != "") {
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao fazer login");
          }
          return response.json();
        })
        .then((data) => {
          e.preventDefault();
          console.log(data);
        })
        .catch((error) => {
          e.preventDefault();
          console.log("Não foi possível registrar o utilizador", error);
        });
    } else {
      e.preventDefault();
      alert("As Palavra-passe não coincidem ou tem campos em branco!!");
    }
  };
  return (
    <div className={styles.container_cadastro}>
      <form action="">
        <div className={styles.container_form_cadastro}>
          <label htmlFor="username">Nome de utilizador</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Insira um nome de utilizador"
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insira o e-mail"
          />
          <label htmlFor="password">Palavra-passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Dever ter 7 caracteres no mínimo"
          />
          <label htmlFor="confirmPassword">Confirme a palavra-passe</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Repita a password"
          />
          <button
            type="submit"
            onClick={(e) => {
              handleCadastroUsuario(e);
            }}
          >
            Criar conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
