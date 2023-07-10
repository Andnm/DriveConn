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
    styleModal,
    isChanged
  } = props;

  const isWarning = title === 'Cảnh báo';

  // Comperation isChanged 
  const className = isChanged === undefined ? '' : !isChanged && title !== 'Bỏ thay đổi' ? 'custom-button' : '';
  const btnActionYesClassName = !isChanged && title !== 'Bỏ thay đổi' ? 'btn-action-yes' : '';

  const isBigSize = title === 'Cập nhập hồ sơ cá nhân'

  return (
    <Modal show={open} onHide={onClose} size={isBigSize ? "xl" : null} centered={centerAction} className={styleModal}>
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
          <div className={className}>
            <Button variant="primary" onClick={eventToContinue} className={btnActionYesClassName}>
              {btnActionYes}
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
