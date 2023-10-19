import React, { useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import "./estilos/tabela.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TabelaDevolucao(props) {

    const [termoDeBusca, setTermoDeBusca] = useState('');
    const [exemplar, setExemplar] = useState([]);
    const [acervoLista, setAcervoLista] = useState([]);

    return (
        <body id="corpo" className="colorwhite">
            <Container className="border mb-2 mt-2 corpoTabela" >
                <h2 className="text-center m-4">Devoluções Cadastradas</h2>
                <Row className='mb-2 mt-2 '>
                    <Col>
                        <Button variant="light"
                            onClick={() => {
                                props.exibirTabela(false);
                                props.setModoEdicao(false);
                            }}>
                            Nova Devolução
                        </Button>
                    </Col>
                </Row>

                <Table striped bordered hover className="text-center">
                    <thead className="colorwhite">
                        <tr>
                            <th>Código</th>
                            <th>Data de Devolução</th>
                            <th>Nome </th>
                            <th>CPF</th>
                            <th>Categoria</th>
                            <th>Título</th>
                            <th>Excluir Devolução</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaDevolucoes?.map((devolucao, indice) => {

                            const dataDevolucao = new Date(devolucao.dataDevolucao);
                            const dia = String(dataDevolucao.getDate()).padStart(2, '0');
                            const mes = String(dataDevolucao.getMonth() + 1).padStart(2, '0');
                            const ano = dataDevolucao.getFullYear();
                            const dataFormatada = `${dia}/${mes}/${ano}`;

                            const cpf = devolucao.pessoa.cpf;
                            const cpfLimpo = cpf.replace(/\D/g, '');
                            const cpfFormatado = cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

                            return (
                                <tr key={indice}>
                                    <td id="colorwhite">{devolucao.codigo}</td>
                                    <td id="colorwhite">{dataFormatada}</td>
                                    <td id="colorwhite">{devolucao.pessoa.nome}</td>
                                    <td id="colorwhite">{cpfFormatado}</td>
                                    <td id="colorwhite">{devolucao.pessoa.categoria}</td>
                                    <td id="colorwhite">
                                        {devolucao.listaExemplares.map((exemplar, index) => {
                                            if (exemplar && exemplar.exemplar && exemplar.exemplar.acervo) {
                                                const titulo = exemplar.exemplar.acervo.titulo;
                                                return <div key={index}>{titulo}</div>;
                                            } else {
                                                return <div key={index}>Título não definido</div>;
                                            }
                                        })}
                                    </td>
                                    <td>
                                        <Button variant="danger"
                                            onClick={() => {
                                                if (window.confirm("Deseja realmente excluir a devolução?")) {
                                                    props.excluirDevolucao(devolucao);
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </body>
    );
}
