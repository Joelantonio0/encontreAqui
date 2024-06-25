import React, { useEffect, useState } from "react";
import styles from "./AdminComponents.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const handleListarUsuarios = () => {
    fetch("http://localhost:5000/listar_usuarios", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsuarios(data.dados);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleListarUsuarios();
  }, []);
  return (
    <>
      <div className={styles.container_gestao_usuarios}>
        <h1>Usuários</h1>
        <div className={styles.tabela_categorias}>
          <DataTable
            value={usuarios}
            tableStyle={{
              minWidth: "50rem",
            }}
            paginator
            rows={5}
            stripedRows
          >
            <Column
              field="pk_usuario"
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
              field="email"
              header="email"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              field="data_criacao"
              header="Data de criação"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              field="fk_nivel"
              header="Nível de acesso"
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center" }}
            ></Column>

            <Column
              body={(rowData) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button p-button-danger"
                  onClick={() => {
                    //handleMostrarOpcao(rowData.pk_categoria);
                  }}
                />
              )}
              header="Desabilitar"
              align="center"
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "4px",
              }}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default GestaoUsuarios;
