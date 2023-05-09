import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import facebookIcon from "../../assets/icons/facebook-white.svg";
import githubIcon from "../../assets/icons/github-white.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGoogle, loginGithub } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContexts";

export function Cadastro() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(false);


  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }
  function onLoginFacebook() {
    loginFacebook()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGithub() {
    loginGithub()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  return (
    <div className={temaEscuro ? "bg-dark text-light h-100" : "bg-light text-dark h-100"}>
      <Container fluid className="my-5">
        <p className="text-center">
          <img src={logoIcon} width="256" alt="Logo do app" />
        </p>
        <h4>Faça parte da nossa plataforma</h4>
        <p className="text-muted">
          Já tem conta? <Link to="/login">Entre</Link>
        </p>
        <hr />
        <div className="mb-3 d-flex justify-content-center">
          <Button className="me-3" variant="danger" onClick={onLoginGoogle}>
            <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
            Google
          </Button>
          <Button className="me-3" variant="primary" onClick={onLoginFacebook}>
            <img src={facebookIcon} width="32" alt="Google icon" /> Entrar com o
            Facebook
          </Button>
          <Button className="me-3" variant="dark" onClick={onLoginGithub}>
            <img src={githubIcon} width="32" alt="Google icon" /> Entrar com o
            GitHub
          </Button>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              placeholder="Seu email"
              {...register("email", { required: "O email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>

            <div className="d-flex">
              <Form.Control
                type={visivel ? "text" : "password"} className={errors.senha && "is-invalid"}
                placeholder="Sua senha"
                {...register("senha", { required: "A senha é obrigatória" })}
              />

              <Button
                variant="success"
                className="senhaOculta"
                onClick={() => setVisivel(!visivel)}>
                {visivel ? <AiOutlineEye />
                  : <AiOutlineEyeInvisible />}
              </Button>{' '}
            </div>

            <Form.Text className="invalid-feedback">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </div>
  );
}
