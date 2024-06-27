import Header from "./../../components/Header/index";
import Footer from "../../components/Footer";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";

function RecuperarItem() {
  const [categorias, setCategorias] = useState([]);
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
        setVisible(data.dados.length > 0); // Define a visibilidade com base nos dados recebidos
      })
      .catch((error) => {
        console.error("Erro ao buscar itens por categorias:", error);
      });
  };

  return (
    <>
      <Header />
      <div style={{ height: "100vh" }}>
        <div className="p-field">
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
            style={{ width: "100%" }}
          />
        </div>
        {visible && (
          <div>
            <h3>Itens Encontrados:</h3>
            <h4>Nomes:</h4>
            <Dropdown
              id="itensDropdown"
              value={itemSelecionado}
              options={itens.map((item) => ({
                label: item.nome,
                value: item.id,
              }))}
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
              placeholder="Selecione um item"
              onChange={(e) => setCorSelecionada(e.value)}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default RecuperarItem;
