import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContexts";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import facebookIcon from "../../assets/icons/facebook-white.svg";
import githubIcon from "../../assets/icons/github-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginFacebook, loginGithub } from "../../firebase/auth";
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Login.css'


export function Login() {
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
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
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
    loginGoogle()
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

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div className={temaEscuro ? "bg-dark text-light h-100" : "bg-light text-dark h-100"}>
      <Container fluid className="my-5">
        <p className="text-center">
          <img src={loginImg} width="256" alt="Logo" />
        </p>
        <h4>Bem-vindo(a) de volta!</h4>
        <p className="text-muted">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
        <hr />
        <div className="m-3 d-flex justify-content-center">
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
              placeholder="Seu email"
              className={errors.email ? "is-invalid" : ""}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <div className="d-flex">
              <Form.Control
                type={visivel ? "text" : "password"} className={errors.senha && "is-invalid"}
                placeholder="Sua senha"
                {...register("senha", { required: "A senha é obrigatória" })}
              />

              <Button
                variant="success"
                className="p-2"
                onClick={() => setVisivel(!visivel)}>
                {visivel ? <AiOutlineEye />
                  : <AiOutlineEyeInvisible />}
              </Button>
            </div>

            <Form.Text className="invalid-feedback">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">
            Entrar
          </Button>

          <div className="quiz">
            <p>Gosta de livros? Venha fazer nosso Quiz!!! <Button as={Link} to='/quiz' variant="success">Quiz</Button></p>

          </div>
        </Form>

      </Container>
    </div>
  );
}
