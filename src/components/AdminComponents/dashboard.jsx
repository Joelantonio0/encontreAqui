import styles from "./AdminComponents.module.css";
function Dashboard() {
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
          <p>Número de usuários activos: 300</p>
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
