import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import Header from "./../../components/Header/index";
import Footer from "../../components/Footer";
import styles from "./Recuperar.module.css";

function RecuperarItem() {
  const [categorias, setCategorias] = useState([]);
  const [itensEncontrados, setItensEncontrados] = useState([]);
  const [itens, setItens] = useState([]);
  const [cores, setCores] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [visible, setVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState();
  const [corSelecionada, setCorSelecionada] = useState();

  useEffect(() => {
    handleListarCategorias();
    handleListarCores();
  }, []);

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
          const nomesCategorias = data.dados.map((categoria) => ({
            label: categoria.nome,
            value: categoria.pk_categoria,
          }));
          setCategorias(nomesCategorias);
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

  const handleListarCores = () => {
    fetch("http://localhost:5000/listar_cores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de cores");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.dados);
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          const cores = data.dados.map((cores) => ({
            label: cores.nome,
            value: cores.pk_cor,
          }));
          setCores(cores);
        } else {
          console.error(
            "Os dados recebidos são um array vazio ou não é um array:",
            data.dados
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de cores:", error);
      });
  };

  const handleBuscarCamposAlternativos = (pkCategoria) => {
    console.log("Categoria pk_categoria:", pkCategoria);
    fetch(`http://localhost:5000/buscar_itens_categoria/${pkCategoria}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar itens por categorias");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.dados);
        setItens(data.dados);
        setVisible(data.dados.length > 0);
        if (data.dados.length == 0) setItensEncontrados([]);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens por categorias:", error);
      });
  };

  const handleRecuperarItem = (categoriaItem, nomeItem, corItem) => {
    console.log("category:", categoriaItem);
    console.log("name:", nomeItem["label"]);
    console.log("color:", corItem);
    fetch(`http://localhost:5000/buscar_item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pk_categoria: categoriaItem,
        nome_item: nomeItem["label"],
        cor_item: corItem,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar item");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.dados);
        if (data.dados) {
          setItensEncontrados([data.dados]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar item:", error);
      });
  };

  const itemTemplate = (item) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 border-top-1 surface-border">
          <img
            className="w-4rem shadow-2 flex-shrink-0 border-round"
            src={`http://localhost:5000/${item.caminho_imagem}`}
            alt={item.nome}
          />
          <div className="flex flex-column gap-2 xl:mr-8">
            <span className="font-bold">{item.nome}</span>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag text-sm"></i>
              <span>{item.descricao}</span>
            </div>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-calendar text-sm"></i>
              <span>{new Date(item.data_aquisicao).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <Header />
        <div
          style={{ height: "100vh" }}
          className={styles.container_recuperar_item}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Selecione uma categoria para encontrar seu item
          </h2>
          <div
            className="p-field"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="category">Categoria</label>
              <Dropdown
                id="category"
                options={categorias}
                value={categoriaSelecionada}
                onChange={(e) => {
                  setCategoriaSelecionada(e.value);
                  handleBuscarCamposAlternativos(e.value);
                }}
                placeholder="Selecione uma categoria"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  marginBottom: "20px",
                }}
              />
            </div>

            {visible && (
              <>
                <h3>Faça as suas escolhas:</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  <h4>Nomes:</h4>
                  <Dropdown
                    id="itensDropdown"
                    value={itemSelecionado}
                    options={
                      itens.length > 0
                        ? itens.map((item) => ({
                            label: item.nome,
                            value: item.id,
                          }))
                        : []
                    }
                    style={{ width: "100%" }}
                    placeholder="Selecione um item"
                    onChange={(e) => setItemSelecionado(e.value)}
                  />
                  <h4>Cores:</h4>
                  <Dropdown
                    id="itensDropdown"
                    value={corSelecionada}
                    options={cores}
                    style={{ width: "100%" }}
                    placeholder="Selecione uma cor"
                    onChange={(e) => setCorSelecionada(e.value)}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    label="Buscar"
                    style={{
                      padding: "10px",
                      color: "white",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      handleRecuperarItem(
                        categoriaSelecionada,
                        itemSelecionado,
                        corSelecionada
                      );
                    }}
                  />
                </div>
              </>
            )}
            {Array.isArray(itensEncontrados) && itensEncontrados.length > 0 ? (
              <>
                <div className="card xl:flex xl:justify-content-center">
                  <DataView
                    value={itensEncontrados}
                    itemTemplate={itemTemplate}
                    layout="list"
                  />
                </div>
                <Button
                  label="Reinvindicar"
                  style={{
                    padding: "10px",
                    color: "white",
                    fontWeight: "500",
                  }}
                />
              </>
            ) : (
              visible && (
                <div>
                  <p>Nenhum item encontrado.</p>
                </div>
              )
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RecuperarItem;
