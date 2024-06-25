import { useEffect, useState } from "react";
import styles from "./AdminComponents.module.css";
function Dashboard() {
  const [totUsuarios, setTotUsuarios] = useState("");
  const [totItens, setTotItens] = useState("");
  const handleTotalUsuarios = () => {
    fetch("http://localhost:5000/buscar_total_usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTotUsuarios(data.dados);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleTotalUsuarios();
  }, []);
  return (
    <>
      Dashboard<h1>Dashboard Resumo</h1>
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
          <h2>Usuários Activos</h2>
          <p>Número de usuários activos: {totUsuarios}</p>
        </div>
        <div className={styles.card}>
          <h2>Actividades recentes</h2>
          <p>Ver as últimas recuperações e ações feitas por usuários.</p>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
