import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import styles from "./Container.module.css";
import img1 from "./img/book-1.jpg";
import img3 from "./img/carkey-1.jpg";
import img4 from "./img/pc-1.jpg";
import img5 from "./img/smartphone-1.jpg";
import img7 from "./img/keyboard-1.jpg";
import img8 from "./img/oculos-1.jpg";

function Container() {
  const [value, setValue] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const handleFiltrar = () => {
    setMostrarFiltros((prev) => !prev);
  };
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
          let teste = data.dados;
          const nomesCategorias = teste.map((teste) => teste.nome);
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
  }, []);
  //dados que devem vir da bd
  const products = [
    {
      id: 1,
      name: "Caderno",
      image: img1,
      cor: "Preto",
      local: "Sala 202",
      data: "20/04/2024",
    },
    {
      id: 2,
      name: "Chaves de carro",
      marca: "Chevrolet",
      image: img3,
      cor: "Preto",
      local: "Praça da alimentação",
      data: "17/05/2024",
    },
    {
      id: 3,
      name: "Computador",
      marca: "MacBook",
      image: img4,
      cor: "Grey",
      local: "Biblioteca",
      data: "17/05/2024",
    },
    {
      id: 4,
      name: "Smartphone",
      marca: "Samsung",
      image: img5,
      cor: "Preto",
      local: "Propedeutico",
      data: "23/02/2024",
    },
    {
      id: 5,
      name: "Teclado de computador",
      marca: "Apple",
      image: img7,
      cor: "Branco",
      local: "Sala 208",
      data: "29/05/2024",
    },
    {
      id: 6,
      name: "Óculos",
      marca: "Não tem",
      image: img8,
      cor: "Prateado",
      local: "Sala 305",
      data: "29/05/2024",
    },
  ];

  const productTemplate = (product) => {
    return (
      <div style={{ marginLeft: "20px" }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            className={`${styles.carousel_img} shadow-2`}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h4 className="mb-1">{product.name}</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button icon="pi pi-search" rounded />
            <Button icon="pi pi-star-fill" rounded severity="success" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-home">
      <div className={styles.section_1}>
        <div className={styles.section_1_texto}>
          <h1>Encontre o seu item perdido</h1>
          <p>
            Com o nosso sistema, tornou-se mais fácil encontrar itens perdidos
            dentro e fora da UCAN
          </p>
          <Button
            label="Vamos começar"
            style={{
              padding: "10px",
              backgroundColor: "var(--primary)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontSize: "1.5rem",
            }}
          />
        </div>
      </div>
      <div className={styles.section_2}>
        <div className={styles.section_2_texto}>
          <h1>Optimize suas buscas através do EncontreAqui</h1>
          <p>
            Cada um de nós fazemos parte do todo, a comunidade Ucaniana nunca
            esteve tão interligada antes do EncontreAqui!
          </p>
        </div>
      </div>
      <div className={styles.section_3}>
        <div className={styles.section_3_texto}>
          <h1>Foto</h1>
        </div>
      </div>
      <div className={styles.section_4}>
        <div className="card flex justify-content-center">
          <InputText
            value={value}
            placeholder="Pesquisar"
            onChange={(e) => setValue(e.target.value)}
            style={{ padding: "8px", marginRight: "5px" }}
          />
          <Button icon="pi pi-search" />
        </div>
        <h1 style={{ color: "#111827" }}>Itens Recuperados</h1>
        <div className={styles.itens}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.item}
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7,
              }}
            >
              <div className={styles.item_texto}>
                <h3>{product.name}</h3>
                <p>Cor: {product.cor}</p>
                <p>Local onde foi perdido: {product.local}</p>
                <p>Dia: {product.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section_5}>
        <div className="card">
          <Carousel
            value={products}
            itemTemplate={productTemplate}
            numVisible={3}
            numScroll={3}
            circular
          />
        </div>
      </div>
    </div>
  );
}

export default Container;
