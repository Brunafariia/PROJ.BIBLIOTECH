import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContexts";
import { UltimosEmprestimos } from "../../components/UltimosEmprestimos/UltimosEmprestimos";
import { CardContadorEmprestimos } from "../../components/CardContadorEmprestimos/CardContadorEmprestimos";
import { ConteudosHome } from "../../components/ConteudosHome/ConteudosHome";
import "./Home.css"
import imagem from "../../assets/images/login.png"
import { Container } from "react-bootstrap";



export function Home() {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  return (

    <div className={temaEscuro ? "bg-dark text-light h-100" : "bg-light text-dark h-100"}>
      <Container>
      <div className="bibliotech">
      <img className="imagem" src={imagem} alt="Bibliotech" />
        <h1>Bibliotech</h1>
        
      </div>
      <div>
        <ConteudosHome />
      </div>
      <div className="ultimos-emprestimos">
        <UltimosEmprestimos />
      </div>
      <div id="cchome">
        <CardContadorEmprestimos />
      </div>
      </Container>
    </div>    
  );
}
