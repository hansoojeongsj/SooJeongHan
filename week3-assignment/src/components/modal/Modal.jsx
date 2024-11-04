// components/modal/Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import * as M from './ModalStyle';

const Modal = ({ onClose, message }) => {
  return ReactDOM.createPortal(
    <M.ModalOverlay>
      <M.ModalContainer>
        <M.ModalMessage>{message}</M.ModalMessage>
        <M.CloseButton onClick={onClose}>닫기</M.CloseButton>
      </M.ModalContainer>
    </M.ModalOverlay>,
    document.getElementById('portal-root')
  );
};

export default Modal;
