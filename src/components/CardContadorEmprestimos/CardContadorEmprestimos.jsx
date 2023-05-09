import { useEffect } from "react";
import { Badge, Button, Card, ListGroup, Table } from "react-bootstrap";
import { getLivros } from "../../firebase/livros";
import { useState } from "react";
import { getEmprestimos } from "../../firebase/emprestimos";

export function CardContadorEmprestimos() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  useEffect(() => {
    getLivros().then((resultado) => {
      setLivros(resultado);
    });
    getEmprestimos().then((resultado) => {
      setEmprestimos(resultado);
    });
  }, []);

  const contarEmprestimosTotais = (i) => {
    let emprestimosTotais = 0;
    emprestimos.forEach((index) => {
      if (index.livro.titulo === i.titulo) {
        emprestimosTotais += 1;
      }
    });
    return emprestimosTotais;
  };

  const contarEmprestimosPendentes = (i) => {
    let emprestimosPendentes = 0;
    emprestimos.forEach((index) => {
      if (index.livro.titulo === i.titulo && index.status === "Pendente") {
        emprestimosPendentes += 1;
      }
    });
    return emprestimosPendentes;
  };

  const contarEmprestimosEntregues = (i) => {
    let emprestimosEntregues = 0;
    emprestimos.forEach((index) => {
      if (index.livro.titulo === i.titulo && index.status === "Entregue") {
        emprestimosEntregues += 1;
      }
    });
    return emprestimosEntregues;
  };

  return livros.map((i) => {
    return (
      <div className="cards">
        <Card>
          <Card.Body>
            <Card.Text id="card-texto">{i.titulo}</Card.Text>
            <Card.Img id="card-img" src={i.urlCapa} height="380px" />
            <Card.Title className="mt-3 text-center">Empréstimos</Card.Title>
            <Card.Text>
              <ListGroup as="ol">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Totais de empréstimos:</div>
                    
                  </div>
                  <Badge bg="success" pill>
                  {contarEmprestimosTotais(i)}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Pendentes</div>
                    
                  </div>
                  <Badge bg="success" pill>
                  {contarEmprestimosPendentes(i)}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Entregues</div>
                 
                  </div>
                  <Badge bg="success" pill>
                  {contarEmprestimosEntregues(i)}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              {/* <Table>
                            <thead>
                                <tr>
                                    <th >Totais</th>
                                    <th >Pendentes</th>
                                    <th >Entregues</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {contarEmprestimosTotais(i)}
                                    </td>
                                    <td>
                                        {contarEmprestimosPendentes(i)}
                                    </td>
                                    <td>
                                        {contarEmprestimosEntregues(i)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table> */}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });
}
