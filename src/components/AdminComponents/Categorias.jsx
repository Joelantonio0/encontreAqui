import React, { useEffect, useState } from "react";
import styles from "./AdminComponents.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
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
  const handleCadastrarCategoria = (e) => {
    e.preventDefault();
    console.log(nome);
    console.log(descricao);
    fetch("http://localhost:5000/nova_categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nome, descricao: descricao }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        setNome("");
        setDescricao("");
      })
      .catch((error) => {
        console.log(error);
      });
    setVisible(false);
  };
  const handleEliminarCategoria = (pk_categoria) => {
    fetch("http://localhost:5000/eliminar_categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pk_categoria: pk_categoria }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={styles.container_categorias}>
        <h1 style={{ textAlign: "center" }}>Lista de categorias</h1>
        <div className={styles.botoes_operacao}>
          <Button
            label="Adicionar"
            style={{ padding: "10px", backgroundColor: "var(--primary)" }}
            icon="pi  pi-plus"
            onClick={() => setVisible(true)}
          />
          <Button
            label="Edit"
            style={{ padding: "10px", backgroundColor: "var(--primary)" }}
            icon="pi pi-pencil"
          />
        </div>
        <div className={styles.tabela_categorias}>
          <DataTable
            value={categorias}
            tableStyle={{
              minWidth: "50rem",
            }}
            paginator
            rows={5}
            stripedRows
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
            <Column
              body={(rowData) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button p-button-danger"
                  onClick={() => {
                    handleEliminarCategoria(rowData.pk_categoria);
                  }}
                />
              )}
              header="Eliminar"
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
      <Dialog
        header="Nova categoria"
        visible={visible}
        style={{ width: "40vw", height: "40vh" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form action="">
          <div className={styles.form_nova_categoria}>
            <label htmlFor="nome">Nome</label>
            <InputText
              placeholder="Insira o nome da categoria"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.form_nova_categoria}>
            <label htmlFor="descricao">Descricao</label>
            <InputText
              placeholder="Insira a descricao"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <Button
              label="Cadastrar"
              style={{ padding: "10px" }}
              onClick={(e) => handleCadastrarCategoria(e)}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default Categorias;
