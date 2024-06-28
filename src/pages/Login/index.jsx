import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import svgFile from "./login.svg";
import $ from "jquery";
import styles from "./Login.module.css";
const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

const Login = () => {
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem, life: 3000 });
  };

  const onSubmit = (data) => {
    $.ajax({
      url: "http://localhost:5000/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: (response) => {
        console.log(response);
        localStorage.setItem("sessionData", JSON.stringify(response));

        if (response.dados.fk_nivel == 1 && response.dados != []) {
          show("Usuário Logado com sucesso", "success");
          window.location.href = "/admin";
        } else if (response.dados.fk_nivel == 2 && response.dados != []) {
          show("Usuário Logado com sucesso", "success");
          window.location.href = "/home";
        } else {
          show("Login falhou", "error");
          window.location.href = "/";
        }
      },
      error: (xhr, status, error) => {
        console.log(data);
        const errMsg =
          xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : "Dados Invalidos";
        show(errMsg, "error");
      },
    });
  };

  const handleSenhaChange = (e) => {
    setValue("senha", e.target.value);
    console.log("Senha field updated:", e.target.value);
  };

  return (
    <>
      <Toast ref={toast} />
      <div
        className="container-login"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="direita"
          style={{
            width: "60%",
            height: "100vh",
            backgroundImage: `url(${svgFile})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="esquerda"
          style={{
            width: "40%",
            height: "100vh",
            padding: "50px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "80px",
          }}
        >
          <div className={styles.logo}>
            <h1 style={{ fontSize: "1.8rem" }}>
              encontre<span style={{ color: "var(--secondary)" }}>Aqui</span>
            </h1>
                      
          </div>

          <div
            className=""
            style={{
              width: "70%",
              maxWidth: "500px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <h2
              className=""
              style={{ textAlign: "center", color: "var(--primary)" }}
            >
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <label htmlFor="email" style={{}}>
                  Email
                </label>
                <InputText
                  id="email"
                  {...register("email")}
                  className={errors.email ? "p-invalid" : ""}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    boxShadow: "none",
                    padding: "7px",
                  }}
                />
                {errors.email && (
                  <small className="p-error">{errors.email.message}</small>
                )}
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="senha" style={{}}>
                  Senha
                </label>
                <InputText
                  type="password"
                  id="senha"
                  {...register("senha")}
                  onChange={handleSenhaChange}
                  feedback={false}
                  className={errors.senha ? "p-invalid" : ""}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    boxShadow: "none",
                    padding: "7px",
                    outline: "none",
                  }}
                />
                {errors.senha && (
                  <small className="p-error">{errors.senha.message}</small>
                )}
              </div>
              <div
                className=""
                style={{
                  marginBottom: "1rem",
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                <Button
                  type="submit"
                  label="Login"
                  className=""
                  style={{
                    width: "100px",
                    padding: "10px",
                    borderRadius: "10px",
                    fontWeight: "500",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
