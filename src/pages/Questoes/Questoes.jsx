import perguntas from "../Quiz/Data/perguntas";
import { useState } from "react";
import "./Questoes.css";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../../assets/images/quiz2.png";

export function Questoes() { /*Criando três estados*/
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [mostrarPontuacao, setMostrarPontuacao] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  /*Função utilizada no onClick quando selecionado a questão correta, adiciona um ponto no score*/
  const handleResponderClick = (isCorrect) => {
    if (isCorrect) {
      setPontuacao(pontuacao + 1);
    }

	/*Função utilizada para mudar para a próxima questão e mostrar a pontuação final do score*/
    const proximaPergunta = questaoAtual + 1;
    if (proximaPergunta < perguntas.length) {
      setQuestaoAtual(proximaPergunta);
    } else {
      setMostrarPontuacao(true);
    }
  };

  return (
    <div
      className="backgroundimage"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="estilizacao">
        <div className="app">
          {mostrarPontuacao ? (
            <>
              <div className="pontuacao">
                Sua Pontuação é {pontuacao} de {perguntas.length}
                <Button as={Link} to="/login" variant="secondary">
                  Voltar
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="botaoquiz1">
                <div>
                  <span>Questão {questaoAtual + 1}</span>/{perguntas.length}
                </div>
                <div>{perguntas[questaoAtual].questao}</div>
              </div>
              <div className="answer-section ">
                {perguntas[questaoAtual].responder.map((responder) => (
                  <button
                    key={responder.pergunta}
                    onClick={() => handleResponderClick(responder.isCorrect)}
                  >
                    {responder.pergunta}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
