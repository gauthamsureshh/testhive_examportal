import React from 'react';
import '../Style/modal.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>x</button>
        <div className="modal-header">
          <h2>Warning</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure, you want to submit?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline-primary" onClick={onConfirm}>Continue</button>
          <button className="btn btn-outline-danger" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
