import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './style.css';

const ModalBox = (props) => {
  const {
    open,
    onClose,
    centerAction,
    title,
    body,
    btnActionNo,
    btnActionYes,
    eventToContinue,
    styleModal
  } = props;

  const isWarning = title === 'Cảnh báo';

  return (
    <Modal show={open} onHide={onClose} centered={centerAction} className={styleModal}>
      <Modal.Header closeButton>
        <Modal.Title className={isWarning ? 'text-danger d-flex gap-2' : ''}>
          {isWarning && <i className="ri-error-warning-line" />} {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {btnActionNo && (
          <Button variant="secondary" onClick={onClose}>
            {btnActionNo}
          </Button>
        )}
        {btnActionYes && (
          <Button variant="primary" onClick={eventToContinue}>
            {btnActionYes}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
