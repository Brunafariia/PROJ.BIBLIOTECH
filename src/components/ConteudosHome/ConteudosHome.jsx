import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { getLivros } from "../../firebase/livros";
import { useState } from "react";
import { getEmprestimos } from "../../firebase/emprestimos";

export function ConteudosHome() {
    const [livros, setLivros] = useState([]);
    const [emprestimos, setEmprestimos] = useState([]);

    useEffect(() => {
        getLivros().then(resultado => {
            setLivros(resultado);
        });
        getEmprestimos().then( resultado => {
            setEmprestimos(resultado);
        });
    }, []);

    const contarEmprestimosEntregues = () => {
        let emprestimosEntregues = [];
        emprestimosEntregues = emprestimos.filter(i => i.status === "Entregue");
        return emprestimosEntregues.length;
    };

    const contarEmprestimosPendentes = () => {
        let emprestimosPendentes = [];
        emprestimosPendentes = emprestimos.filter(i => i.status === "Pendente");
        return emprestimosPendentes.length;
    };

    return (
        <div className="conteudos-home">
            <div id="emprestimos-totais">
            <Card>
                <Card.Body>Total de empréstimos: {emprestimos.length} </Card.Body>
            </Card>
            </div>

            <div id="livros-totais">
            <Card>
                <Card.Body>Total de livros: {livros.length} </Card.Body>
            </Card>
            </div>

            <div id="emprestimos-pendentes-entregues">
            <Card>
                <Card.Body>
                    <p>Empréstimos entregues: {contarEmprestimosEntregues()}</p><br />
                    <p>Empréstimos pendentes: {contarEmprestimosPendentes()}</p>
                </Card.Body>
            </Card>
            </div>
        </div>
    );
};