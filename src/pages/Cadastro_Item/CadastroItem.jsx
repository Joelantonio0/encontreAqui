import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import $ from "jquery";

// Validation schema
const schema = yup.object().shape({
  nome: yup.string().required("Nome do item é obrigatório"),
  descricao: yup.string().required("Descrição do item é obrigatória"),
  data_aquisicao: yup.date().required("Data da perda é obrigatória").nullable(),
  local_perda: yup.string().required("Local da perda é obrigatório"),
  fk_categoria: yup.string().required("Categoria é obrigatória"),
  fk_estado: yup.string().required("Estado é obrigatório"),
  informacoes_contato: yup
    .string()
    .required("Informações de contato são obrigatórias"),
});

const Item = () => {
  const toast = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valorCategoria, setValorCategoria] = useState([]);
  const [valorEstado, setValorEstado] = useState([]);
  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem, life: 3000 });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        if (Array.isArray(data.dados) && data.dados.length > 0) {
          const formattedCategorias = data.dados.map((categoria) => ({
            label: categoria.nome,
            value: categoria.id,
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
  }, []);

  const onSubmit = async (data) => {
    $.ajax({
      url: "http://localhost:5000/item",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: "json",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.success) {
          show("Reportação efectuada com sucesso", "success");
          setTimeout(() => {
            window.location.href = "/home";
          }, 3000);
        } else {
          show("Erro ao efectuar a Reportação ", "error");
        }
      },
      error: function (error) {
        console.log(data);
        show("Erro ao efectuar a Reportação ", "error");
      },
    });
  };

  return (
    <>
      <Header />
      <Toast ref={toast} />
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
          <h2 className="p-text-center" style={{ textAlign: "center" }}>
            Reportar Item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="nome" style={{ marginLeft: "5px" }}>
                Nome
              </label>
              <InputText
                id="nome"
                {...register("nome")}
                className={errors.nome ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
              {errors.nome && (
                <small className="p-error">{errors.nome.message}</small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="descricao" style={{ marginLeft: "5px" }}>
                Descrição
              </label>
              <InputTextarea
                id="descricao"
                {...register("descricao")}
                className={errors.descricao ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
                rows={5}
              />
              {errors.descricao && (
                <small className="p-error">{errors.descricao.message}</small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="data_aquisicao" style={{ marginLeft: "5px" }}>
                Data da Perda
              </label>
              <Calendar
                id="data_aquisicao"
                {...register("data_aquisicao")}
                className={errors.data_aquisicao ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
                showIcon
              />
              {errors.data_aquisicao && (
                <small className="p-error">
                  {errors.data_aquisicao.message}
                </small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="local_perda" style={{ marginLeft: "5px" }}>
                Local da Perda
              </label>
              <InputText
                id="local_perda"
                {...register("local_perda")}
                className={errors.local_perda ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
              {errors.local_perda && (
                <small className="p-error">{errors.local_perda.message}</small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="fk_categoria" style={{ marginLeft: "5px" }}>
                Categoria
              </label>
              <Dropdown
                id="fk_categoria"
                {...register("fk_categoria")}
                value={valorCategoria}
                onChange={(e) => {
                  setValorCategoria(e.value);
                }}
                options={categorias}
                className={errors.fk_categoria ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
              {errors.fk_categoria && (
                <small className="p-error">{errors.fk_categoria.message}</small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label htmlFor="fk_estado" style={{ marginLeft: "5px" }}>
                Estado
              </label>
              <Dropdown
                id="fk_estado"
                {...register("fk_estado")}
                options={estados}
                value={valorEstado}
                onChange={(e) => {
                  setValorEstado(e.value);
                }}
                className={errors.fk_estado ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
              {errors.fk_estado && (
                <small className="p-error">{errors.fk_estado.message}</small>
              )}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: "5px" }}>
              <label
                htmlFor="informacoes_contato"
                style={{ marginLeft: "5px" }}
              >
                Informações de Contato
              </label>
              <InputText
                id="informacoes_contato"
                {...register("informacoes_contato")}
                className={errors.informacoes_contato ? "p-invalid" : ""}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
              {errors.informacoes_contato && (
                <small className="p-error">
                  {errors.informacoes_contato.message}
                </small>
              )}
            </div>
            <div
              className="p-d-flex p-jc-center"
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <Button
                type="submit"
                label="Reportar Item Perdido"
                className="p-button-rounded p-button-primary"
                style={{ width: "200px" }}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Item;
