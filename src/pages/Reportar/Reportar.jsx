import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

export function Reportar({show, handleClose}){
    return(
        <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reportar</Modal.Title>
          </Modal.Header>
          <Modal.Body>Notificação enviada aos desenvolvedores</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
}