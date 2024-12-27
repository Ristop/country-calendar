import React from 'react';
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
    <div className="pp-modal-container fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur" onClick={onClose}>
      <div className="pp-modal w-[600px] rounded-lg flex flex-col p-4 relative ml-2 mr-2 shadow-black bg-modal-radial bg-fixed bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center mb-2">
          <div>
            <div className="text-xl flex-1 font-bold text-base-blue">
              {title}
            </div>
            {description && (
              <div className="mt-2">
                {description}
              </div>)
            }
          </div>
          {showCloseButton &&
            <div className="close-button p-1 rounded-full text-center ml-auto relative -right-2 -top-2 hover:bg-light-blue hover:cursor-pointer">
              <FontAwesomeIcon icon={faClose} className='w-5 h-5 min-w-5 min-h-5' onClick={onClose} />
            </div>
          }
        </div>
        <div className="">
          {children}
        </div>
        <div className="flex justify-end mt-2">
          <Button label="Confirm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
