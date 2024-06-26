import React, { useEffect, useState, useRef } from "react";
import styles from "./AdminComponents.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
function Categorias() {
  const toast = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [categoriaID, setCategoriaID] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem, life: 3000 });
  };
  const handleListarCategorias = () => {
    fetch("http://localhost:5000/listar_categorias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de categorias");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.dados);
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          setCategorias(data.dados);
        } else {
          console.error(
            "Os dados recebidos são um array vazio ou não é um array:",
            data.dados
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de categorias:", error);
      });
  };
  useEffect(() => {
    handleListarCategorias();
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
        show("Cadastro efectuado com sucesso", "success");
        setNome("");
        setDescricao("");
        setTimeout(() => {}, 3000);
        handleListarCategorias();
      })
      .catch((error) => {
        console.log(error);
        show("Cadastro não efectuado com sucesso", "error");
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
        show("Eliminação efectuada com sucesso", "success");
        setTimeout(() => {}, 3000);
        handleListarCategorias();
      })
      .catch((error) => {
        console.log(error);
        show("Eliminação não efectuada com sucesso", "error");
      });
    setVisible2(false);
  };
  const handleMostrarOpcao = (pk_categoria) => {
    setCategoriaID(pk_categoria);
    setVisible2(true);
    console.log(categoriaID);
  };
  return (
    <>
      <Toast ref={toast} />
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
                    handleMostrarOpcao(rowData.pk_categoria);
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
      <Dialog
        header="Confirmar eliminação"
        visible={visible2}
        style={{ width: "30vw", height: "30vh" }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Button
            label="Confirmar"
            className="p-button-danger"
            style={{ padding: "10px" }}
            onClick={() => handleEliminarCategoria(categoriaID)}
          />
          <Button
            label="Cancelar"
            style={{ padding: "10px" }}
            onClick={() => setVisible2(false)}
          />
        </div>
      </Dialog>
    </>
  );
}

export default Categorias;
