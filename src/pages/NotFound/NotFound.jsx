import notfound from "../../assets/images/login.png";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useState } from "react";
import { Reportar } from "../Reportar/Reportar";
import "./NotFound.css";


export function NotFound() {
    const navigate = useNavigate();
    function onLogout() {
        logout().then(() => {
          navigate("/login");
        });
      }

      const url_digitada = window.location.pathname;

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
 
    return (
    <div className="notfound">
      <h3>Não encontramos:<span className="colortext"> {url_digitada} </span></h3>

      <img className="imagemnotfound" src={notfound} alt="página não encontrada" />

        <div>
      
        <Button className="me-2"  as={Link} to="/" variant="outline-success">Voltar</Button>
        <Button className="me-2" onClick={onLogout} variant="outline-secondary">Login</Button>
        <Button onClick={handleShow} variant="outline-danger">Reportar</Button>{' '}
        
      </div>

      <Reportar show={show} handleClose={handleClose}/>

    </div>
  );
}
