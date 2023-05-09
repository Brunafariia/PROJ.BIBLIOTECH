import "./Quiz.css"
import quiz from "../../assets/images/saudacaoquiz.jpg"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"


export function Quiz(){
    return (<>
    <div className="body">
        <h1>Quiz de Literatura</h1>

        <h2>Seja bem-vindo(a)</h2>
        <p>clique no botão abaixo para começar:</p>
        <img className="imagemquiz" src={quiz} alt="Início do Quiz" />
        <Button as={Link} to='/quiz/questoes' variant="success" className="botaoquiz">Iniciar</Button>
    </div>
    
    </>)
}

