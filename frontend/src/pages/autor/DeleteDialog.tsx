import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteDialog({ handleClose, show, assuntoDelete, fetchDelete}) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirmar execlusão do autor <strong>{assuntoDelete?.Nome} </strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={ fetchDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteDialog;