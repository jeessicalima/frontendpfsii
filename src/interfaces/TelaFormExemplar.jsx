import Pagina from "../templates/componentes/Pagina.js";
import FormExemplar from "../Formularios/FormExemplar.jsx";
import TabelaExemplar from "../tabelas/TabelaExemplar.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import "../tabelas/estilos/tabela.css";
import {Spinner} from "react-bootstrap"
import { useState, useEffect } from "react";

export default function TelaFormExemplar(props){

    const [exibirTabela, setExibirTabela] = useState (true);
    const [exemplar, setExemplar] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [exemplarEmEdicao, setExemplarEmEdicao] = useState({
        codigo: "",
        quantidade: "",
        dataCadastro: "",
        status: "",
        acervo: {
            codigo: "",
            titulo: "",
        }
    });
    
    function prepararExemplarParaEdicao(exemplar) {
        setModoEdicao(true);
        setExemplarEmEdicao({
            codigo: exemplar.codigo,
            quantidade: exemplar.quantidade,
            dataCadastro: exemplar.dataCadastro,
            status: exemplar.status,
            acervo: {
                codigo: exemplar.acervo.codigoRegisto,
                titulo: exemplar.acervo.tituloDoLivro,
            },
            
        });
        setExibirTabela(false);
    }
    

    function apagarExemplar(exemplar){
        fetch(urlBase+"/exemplar", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(exemplar)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir a exemplar")
            }
            else{
                buscarExemplar()
            }
        })
    }


    function buscarExemplar() {
        fetch(urlBase + "/exemplar", {
            method: "GET"
        })
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro na requisição');
            }
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                setExemplar(dados);
                exibirTabela(true);
            } else {
                setErro(dados.status);
            }
            setProcessado(true);
        })
        .catch((error) => {
            console.error('Erro na busca de exemplar:', error);
            setProcessado(true);
        });
    }
    

    useEffect(() =>{
        buscarExemplar();
    },[])

    useEffect(() => {
        if(exibirTabela){
            buscarExemplar();
        }
    }, [exibirTabela])

    if (erro){
        return <div>
            <p>Erro ao obter os exemplar do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando exemplar...</span>
        </Spinner>
    }
    else{
        return <Pagina>
            <div>
            {
                exibirTabela ? 
                <TabelaExemplar 
                listaExemplar={exemplar} 
                exibirTabela={setExibirTabela}
                editarExemplar={prepararExemplarParaEdicao}
                excluirExemplar={apagarExemplar}
                setModoEdicao={setModoEdicao}
                buscar={buscarExemplar}
                setExemplar={setExemplar}
                /> 
                :
                <FormExemplar 
                listaExemplar={exemplar} 
                setExemplar={setExemplar}
                exibirTabela={setExibirTabela}
                buscar={buscarExemplar}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                exemplar={exemplarEmEdicao}
                />
            }
            </div>
        </Pagina>
        }
}