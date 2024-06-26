import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Componentes
import "primeicons/primeicons.css"; // Ícones

function GestaoItens() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/listar_itens")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          setItens(data.dados);
        } else {
          console.error(
            "Os dados recebidos são um array vazio ou não é um array:",
            data.dados
          );
        }
      })
      .catch((error) => console.error("Erro ao listar itens:", error));
  }, []);

  return (
    <>
      <h1>Gestão de itens</h1>
      <div className="card">
        <DataTable value={itens} responsiveLayout="scroll">
          <Column field="id" header="ID" sortable></Column>
          <Column field="nome" header="Nome" sortable></Column>
          <Column field="descricao" header="Descrição" sortable></Column>
        </DataTable>
      </div>
    </>
  );
}

export default GestaoItens;
