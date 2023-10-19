import Container from "react-bootstrap/Container";
import "./estilos/Inicio.css";
import imgInicio from "../img/f0910838545f47a3cd8e53fd46e5d8cb-gpLarge.jpg";
export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <h1 className="text-center">Escola Municipal Anna de Mello Castriani</h1>
      <img className="mx-auto d-block" src={imgInicio}></img>
      <Container>
        <hr></hr>
        <h2 className="text-center">FAÇA JÁ SUA DOAÇÃO DE LIVROS!!!</h2>
        <p className="paragrafo">
        <ul className="text-center listaInicio">
          <li>Sabe aquele livro que você já não lê mais?</li>
          <li>Para desocupar espaço na sua casa e para incentivar a leitura,</li>
          <li>faça uma doação e espalhe a cultura ao próximo!</li>
          <li>Para mais informações de como realizar doação para nossa biblioteca,</li>
          <li>entre em contato conosco pelo e-mail ou telefone abaixo:</li>
          <li>(18)99999-9999</li>
          <li>biblioteca@escola.com</li>
        </ul>
        </p>
        <hr></hr>
      </Container>
    </body>
  );
}
