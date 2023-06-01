import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalBox = (props) => {

    const {open, onClose, title, body, btnAction, centerAction} = props;

    return (
        <Modal show={open} onHide={onClose} centered={centerAction}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    {btnAction}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalBox