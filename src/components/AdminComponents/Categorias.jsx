import React, { useEffect, useState } from "react";
import styles from "./AdminComponents.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/listar_categorias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de categorias");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.dados);
        setCategorias(data.dados);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de categorias:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.container_categorias}>
        <h1 style={{ textAlign: "center" }}>Lista de categorias</h1>
        <div className={styles.tabela_categorias}>
          <DataTable
            value={categorias}
            tableStyle={{
              minWidth: "50rem",
            }}
          >
            <Column
              field="pk_categoria"
              header="ID"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center", padding: "10px" }}
            ></Column>
            <Column
              field="nome"
              header="Nome"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              field="descricao"
              header="Descricao"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Categorias;
