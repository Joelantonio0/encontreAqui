import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Componentes
import "primeicons/primeicons.css"; // Ícones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import $ from "jquery";

// Validation schema
const schema = yup.object().shape({
  nome: yup.string().required("Nome do item é obrigatório"),
  descricao: yup.string().required("Descrição do item é obrigatória"),
  data_aquisicao: yup.date().required("Data da perda é obrigatória").nullable(),
  fk_local: yup.string().required("Local da perda é obrigatório"),
  fk_cor: yup.string().required("Cor é obrigatório"),
  fk_categoria: yup.string().required("Categoria é obrigatória"),
  fk_estado: yup.string().required("Estado é obrigatório"),
  caminho_imagem: yup.string(),
});

const Item = ({ toast }) => {
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valorCategoria, setValorCategoria] = useState(null);
  const [valorEstado, setValorEstado] = useState(null);
  const [imagem, setImagem] = useState(null); // Estado para armazenar a imagem
  const [locaisPerda, setLocaisPerda] = useState([]);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [cores, setCores] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  useEffect(() => {
    // Fetching categories
    fetch("http://localhost:5000/listar_categorias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de categorias");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          const formattedCategorias = data.dados.map((categoria) => ({
            label: categoria.nome,
            value: categoria.pk_categoria,
          }));
          setCategorias(formattedCategorias);
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

    // Fetching item states
    fetch("http://localhost:5000/listar_estados_itens")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de estados");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          const formattedEstados = data.dados.map((estado) => ({
            label: estado.descricao,
            value: estado.pk_estado,
          }));
          setEstados(formattedEstados);
        } else {
          console.error(
            "Os dados recebidos são um array vazio ou não é um array:",
            data.dados
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de estados:", error);
      });

    fetch("http://localhost:5000/listar_locais_perda")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os locais de perda");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          const locais = data.dados.map((local) => ({
            label: local.nome,
            value: local.pk_local,
          }));
          setLocaisPerda(locais);
          console.log(data.dados);
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

    handleListarCores();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Adicionar campos de texto ao FormData
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append(
      "data_aquisicao",
      data.data_aquisicao.toISOString().split("T")[0]
    );
    formData.append("fk_local", localSelecionado);
    formData.append("fk_cor", corSelecionada);
    formData.append("fk_categoria", valorCategoria);
    formData.append("fk_estado", valorEstado);
    formData.append("fk_usuario", 1);

    // Adicionar arquivo de imagem se estiver definido
    if (imagem) {
      formData.append("caminho_imagem", imagem);
    }

    console.log("Dados enviados:", formData);

    // Enviar dados usando fetch ou $.ajax
    try {
      const response = await fetch("http://localhost:5000/reportar_perda", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao efetuar a Reportação");
      }

      const data = await response.json();
      if (data.success) {
        toast.current.show("Reportação efetuada com sucesso", "success");
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      } else {
        toast.current.show("Erro ao efetuar a Reportação", "error");
      }
    } catch (error) {
      toast.current.show("Erro ao efetuar a Reportação", "error");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);
  };

  const handleReportar = () => {};

  return (
    <div
      className="p-d-flex p-jc-center p-ai-center p-mt-6"
      style={{
        height: "100vh",
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="p-card p-p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <h2 className="p-text-center">Reportar Item</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-fluid"
          enctype="multipart/form-data"
        >
          <div className="p-field p-mb-3">
            <label htmlFor="nome">Nome do Item</label>
            <InputText
              id="nome"
              {...register("nome")}
              className={errors.nome ? "p-invalid" : ""}
            />
            {errors.nome && (
              <small className="p-error">{errors.nome.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="descricao">Descrição</label>
            <InputTextarea
              id="descricao"
              {...register("descricao")}
              className={errors.descricao ? "p-invalid" : ""}
              rows={5}
            />
            {errors.descricao && (
              <small className="p-error">{errors.descricao.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="data_aquisicao">Data da Perda</label>
            <Calendar
              id="data_aquisicao"
              {...register("data_aquisicao")}
              className={errors.data_aquisicao ? "p-invalid" : ""}
              showIcon
            />
            {errors.data_aquisicao && (
              <small className="p-error">{errors.data_aquisicao.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="fk_local">Local da Perda</label>
            <Dropdown
              id="fk_local"
              {...register("fk_local")}
              value={localSelecionado}
              onChange={(e) => setLocalSelecionado(e.value)}
              options={locaisPerda}
              className={errors.fk_local ? "p-invalid" : ""}
            />
            {errors.fk_local && (
              <small className="p-error">{errors.fk_local.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="fk_cor">Cor</label>
            <Dropdown
              id="fk_cor"
              {...register("fk_cor")}
              value={corSelecionada}
              onChange={(e) => setCorSelecionada(e.value)}
              options={cores}
              className={errors.fk_cor ? "p-invalid" : ""}
            />
            {errors.fk_cor && (
              <small className="p-error">{errors.fk_cor.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="fk_categoria">Categoria</label>
            <Dropdown
              id="fk_categoria"
              {...register("fk_categoria")}
              value={valorCategoria}
              onChange={(e) => setValorCategoria(e.value)}
              options={categorias}
              className={errors.fk_categoria ? "p-invalid" : ""}
            />
            {errors.fk_categoria && (
              <small className="p-error">{errors.fk_categoria.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="fk_estado">Estado</label>
            <Dropdown
              id="fk_estado"
              {...register("fk_estado")}
              value={valorEstado}
              onChange={(e) => setValorEstado(e.value)}
              options={estados}
              className={errors.fk_estado ? "p-invalid" : ""}
            />
            {errors.fk_estado && (
              <small className="p-error">{errors.fk_estado.message}</small>
            )}
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="caminho_imagem">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-inputtext p-component"
            />
            {errors.caminho_imagem && (
              <small className="p-error">{errors.caminho_imagem.message}</small>
            )}
          </div>
          <Button
            type="submit"
            label="Reportar"
            className="p-mt-3"
            onClick={() => {
              handleReportar();
            }}
          />
        </form>
      </div>
    </div>
  );
};

const GestaoItens = () => {
  const [itens, setItens] = useState([]);
  const toast = useRef(null); // Ref para o componente Toast

  useEffect(() => {
    fetch("http://localhost:5000/listar_itens")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.dados);
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
      <div>
        <Toast ref={toast} />
        <h1>Gestão de itens</h1>
        <div className="card">
          <DataTable value={itens} responsiveLayout="scroll">
            <Column
              field="pk_item"
              header="ID"
              sortable
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
              sortable
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center", padding: "10px" }}
            ></Column>
            <Column
              field="descricao"
              header="Descrição"
              sortable
              alignHeader={"center"}
              headerStyle={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
              style={{ textAlign: "center", padding: "10px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default GestaoItens;
