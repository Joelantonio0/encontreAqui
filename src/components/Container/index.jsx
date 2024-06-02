import React, { useState, useEffect } from "react";
import styles from "./Container.module.css";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import img1 from "./img/book-1.jpg";
import img2 from "./img/book-1.jpg";
import img3 from "./img/carkey-1.jpg";
import img4 from "./img/pc-1.jpg";
import img5 from "./img/smartphone-1.jpg";
import img6 from "./img/img1.jpg";
import img7 from "./img/keyboard-1.jpg";
import img8 from "./img/oculos-1.jpg";
function Container() {
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
      <div
        style={{
          marginLeft: "20px",
        }}
      >
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
        <h1 style={{ color: "#111827" }}>Itens perdidos</h1>
        <div className={styles.itens}>
          <div className={styles.item_1}>
            <div className={styles.item_texto}>
              <h3>Caderno</h3>
              <p>Cor: Preto</p>
              <p>Local onde foi perdido: Sala 202</p>
              <p>Dia: 20/04/2024</p>
            </div>
          </div>
          <div className={styles.item_2}>
            <div className={styles.item_texto}>
              <h3>Chaves de carro</h3>
              <p>Marca: Chevrolet</p>
              <p>
                Local onde foi perdido: Praça da alimentação Dia: 17/05/2024
              </p>
            </div>
          </div>
          <div className={styles.item_3}>
            <div className={styles.item_texto}>
              <h3>Computador</h3>
              <p>Marca: Macbook</p>
              <p>Cor: Grey </p>
              <p>Local onde foi perdido: Biblioteca</p>
              <p>Dia: 17/05/2024</p>
            </div>
          </div>
        </div>
        <div className={styles.itens}>
          <div className={styles.item_1}>
            <div className={styles.item_texto}>
              <h3>Caderno</h3>
              <p>Cor: Preto</p>
              <p>Local onde foi perdido: Sala 202</p>
              <p>Dia: 20/04/2024</p>
            </div>
          </div>
          <div className={styles.item_2}>
            <div className={styles.item_texto}>
              <h3>Chaves de carro</h3>
              <p>Marca: Chevrolet</p>
              <p>
                Local onde foi perdido: Praça da alimentação Dia: 17/05/2024
              </p>
            </div>
          </div>
          <div className={styles.item_3}>
            <div className={styles.item_texto}>
              <h3>Computador</h3>
              <p>Marca: Macbook</p>
              <p>Cor: Grey </p>
              <p>Local onde foi perdido: Biblioteca</p>
              <p>Dia: 17/05/2024</p>
            </div>
          </div>
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
