import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos, pagination } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContexts";
import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import { DocumentSnapshot, collection, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter, startAt } from "@firebase/firestore";
import { db } from "../../firebase/config";
import { emprestimosCollection, livrosCollection } from "../../firebase/collections";
import { Dropdown } from "react-bootstrap";

export function Emprestimos() {

  const [emprestimos, setEmprestimos] = useState(null);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [itensPerPage, setItensPerPage] = useState(5);
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;


  // useEffect(() => {
  //     getEmprestimos().then(busca => {
  //         setEmprestimos(busca);
  //     })
  // }, [])

  function inicializaPagina() {
    const primeiraPagina = query(collection(db, "emprestimos"), orderBy("leitor"), limit(5));
    getDocs(primeiraPagina).then((snapShot) => {
      let pagina = [];
      let primeiro = snapShot.docs[0];
      setFirst(primeiro);

      let ultimo = snapShot.docs[snapShot.docs.length - 1];
      setLast(ultimo);

      snapShot.forEach((doc) => {
        pagina.push({ ...doc.data(), id: doc.id });
      })
      setEmprestimos(pagina);
    })
  }

  function ultimaPagina() {
    const ultimaPagina = query(emprestimosCollection, orderBy("leitor"), startAt(emprestimosCollection.length - 5), limit(5));
    getDocs(ultimaPagina).then((snapShot) => {
      let voltarPagina = [];
      let primeiro = snapShot.docs[0];
      setFirst(primeiro);

      let ultimo = snapShot.docs[snapShot.docs.length - 1];
      setLast(ultimo);
      console.log(ultimo);

      snapShot.forEach((doc) => {
        voltarPagina.push({ ...doc.data(), id: doc.id });
      })
      setEmprestimos(voltarPagina);
    });
  }

  useEffect(() => {
    inicializaPagina();
    ultimaPagina();
  }, []);

  function avancar() {
    const proximaPagina = query(collection(db, "emprestimos"), orderBy("leitor"), startAfter(last), limit(5));
    getDocs(proximaPagina).then((snapShot) => {
      let proxPagina = [];
      console.log(proxPagina);

      let primeiro = snapShot.docs[0];
      console.log(primeiro);
      setFirst(primeiro);
      let ultimo = snapShot.docs[snapShot.docs.length - 1];
      console.log(ultimo);

      if (ultimo?._document.data.value.mapValue.fields.id !== undefined) {
        setLast(ultimo);
        snapShot.forEach((doc) => {
          proxPagina.push({ ...doc.data(), id: doc.id });
        })
        setEmprestimos(proxPagina);

      } else {
        inicializaPagina();
      }
    })
  }

  function retroceder() {
    const retroceder = query(collection(db, "emprestimos"), orderBy("leitor"), limit(5));
    getDocs(retroceder).then((snapShot) => {
      let voltar = [];
      let primeiro = snapShot.docs[0];
      setFirst(primeiro);
      let ultimo = snapShot.docs[snapShot.docs.length - 1];

      if (primeiro?._document.data.value.mapValue.fields.id !== undefined) {
        setLast(ultimo);
        snapShot.forEach((doc) => {
          voltar.push({ ...doc.data(), id: doc.id });
        })
        setEmprestimos(voltar);
      } else {
        ultimaPagina();
      }
    })
  }

  return (
    <div className={temaEscuro ? "bg-dark text-light vh-100" : "bg-light text-dark vh-100"}>
      <div className="emprestimos">


        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Emprestimos</h1>

            <Button as={Link} to="/emprestimos/adicionar" variant="success">
              Adicionar emprestimo
            </Button>
          </div>
          <hr />
          {emprestimos === null ? (
            <Loader />
          ) :
            <Table className={`tabela ${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"}`}>         
            <thead>
              <tr>
                <th>Leitor</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Livro</th>
                <th>Status</th>
                <th>Data de Empréstimo</th>
                <th>Ações</th>
              </tr>
            </thead>
              <tbody>
                {emprestimos.map((emprestimo) => {
                  const dataEmprestimo = emprestimo.dataEmprestimo
                    .toDate()
                    .toLocaleDateString("pt-br");
                  return (
                    <tr key={emprestimo.id}>
                      <td>{emprestimo.leitor}</td>
                      <td>{emprestimo.email}</td>
                      <td>{emprestimo.telefone}</td>
                      <td>{emprestimo.livro.titulo}</td>
                      <td>
                        <Badge
                          bg={
                            emprestimo.status === "Pendente"
                              ? "warning"
                              : "success"
                          }
                        >
                          {emprestimo.status}
                        </Badge>
                      </td>
                      <td>{dataEmprestimo}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Dropdown
                            onSelect={(status) => {
                              const emprestimoIndex = emprestimos.findIndex(
                                (e) => e.id === emprestimo.id
                              );
                              const updatedEmprestimos = [...emprestimos];
                              updatedEmprestimos[emprestimoIndex] = {
                                ...updatedEmprestimos[emprestimoIndex],
                                status,
                              };
                              setEmprestimos(updatedEmprestimos);
                            }}
                          >
                            <Dropdown.Toggle
                              variant={
                                emprestimo.status === "Pendente"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {emprestimo.status}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="Pendente">
                                Pendente
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Entregue">
                                Entregue
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Button
                            as={Link}
                            to={`/emprestimos/editar/${emprestimo.id}`}
                            variant="warning"
                            size="sm"
                            className="ms-2"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

          }
          <Pagination className="d-flex justify-content-center">
            <Button variant="none" onClick={retroceder}><Pagination.Prev /></Button>
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>


            <Button variant="none" onClick={avancar}>
              <Pagination.Next /></Button>
          </Pagination>
        </Container>
      </div>
    </div>
  );
}
