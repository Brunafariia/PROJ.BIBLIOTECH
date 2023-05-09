import { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import TimeAgo from 'timeago-react';
import { format, render, cancel, register } from 'timeago.js';
import { queryEmprestimos } from "../../firebase/emprestimos";
import * as timeago from 'timeago.js';

import pt from 'timeago.js/lib/lang/pt_BR';
import { CardContadorEmprestimos } from "../CardContadorEmprestimos/CardContadorEmprestimos";
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContexts';

timeago.register('pt_BR', pt);


export function UltimosEmprestimos() {
    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;
    const [emprestimos, setEmprestimos] = useState([]);

    useEffect(() => {
        queryEmprestimos("dataEmprestimo", "desc", 5).then(resultado => {
            setEmprestimos(resultado);
        });
    }, []);



    return (

            <Container>
                <div className="ultimos-emprestimos">
                    <h3><span class="glyphicon glyphicon-book"></span> Últimos Empréstimos</h3>
                    <Table className={`tabela ${temaEscuro ? "bg-dark text-light" : "bg-success text-light"}`}>
                        <thead>
                            <tr>
                                <th>Leitor</th>
                                <th>Livro</th>
                                <th><i class="bi bi-clock-fill"></i></th>
                            </tr>
                        </thead>

                        <tbody>
                            {emprestimos.map(i => {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.leitor}</td>
                                        <td>{i.livro.titulo}</td>
                                        <td><TimeAgo datetime={i.dataEmprestimo.toDate()} locale='pt_BR' live={false} /></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Container>
        
    );
};