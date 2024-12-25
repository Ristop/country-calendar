import React from 'react';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, description, isOpen, showCloseButton = true, onClose, onConfirm, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="pp-modal-container" onClick={onClose}>
      <div className="pp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pp-modal-header">
          <div>
            <div className="modal-title">
              {title}
            </div>
            {description && (
              <div className="modal-description">
                {description}
              </div>)
            }
          </div>
          {showCloseButton &&
            <div className="close-button">
              <FontAwesomeIcon icon={faClose} className={'icon'} onClick={onClose} />
            </div>
          }
        </div>
        <div className="pp-modal-body">
          {children}
        </div>
        <div className="pp-modal-footer">
          <Button label="Confirm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
