import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { AuthContext } from "./contexts/AuthContext";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { NotFound } from './pages/NotFound/NotFound';
import { Reportar } from "./pages/Reportar/Reportar";
import { Quiz } from "./pages/Quiz/Quiz";
import { Questoes } from "./pages/Questoes/Questoes";
import { ThemeContext } from "./contexts/ThemeContexts";
import { Perfil } from "./pages/Perfil/Perfil";


export function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setUsuarioLogado(user);
    });

  }, []);

  const [temaEscuro, setTemaEscuro] = useState(false);

  function alternar() {
    if (temaEscuro === true) {
      setTemaEscuro(false)
    } else {
      setTemaEscuro(true)
    }
  }

  return (
    <>
      <AuthContext.Provider value={usuarioLogado}>
      <ThemeContext.Provider value={{ temaEscuro: temaEscuro, alternar: alternar }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/" element={<Home />} />
              <Route path="/livros" element={<Livros />} />
              <Route path="/livros/adicionar" element={<AdicionarLivro />} />
              <Route path="/livros/editar/:id" element={<EditarLivro />} />
              <Route path="/emprestimos" element={<Emprestimos />} />
              <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
              <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/reportar" element={<Reportar />} />

            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/questoes" element={<Questoes />} />
           

          </Routes>
        </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}
