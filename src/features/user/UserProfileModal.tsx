import React, { useState } from 'react';
import Modal from '../../components/Modal';
import TextField from '../../components/TextField';

export interface UserProfileModalProps {
  year: number | undefined;
  isOpen: boolean;
  setShowModal: (open: boolean) => void;
  setStartYear: (year: number) => void;
}

const UserProfileModal = ({ year, isOpen, setShowModal, setStartYear }: UserProfileModalProps) => {
  const [editedYear, setEditedYear] = useState<number | undefined>(year);

  return (
    <Modal
      title="User Profile"
      description={!year ? 'Set your birth year to start using the app' : ''}
      isOpen={isOpen}
      showCloseButton={!!year}
      onClose={() => {
        if (year !== undefined) {
          setShowModal(false);
        }
      }}
      onConfirm={() => {
        if (editedYear !== undefined) {
          setStartYear(editedYear!);
          setShowModal(false);
        }
      }}>
      <div className="w-36">
        <TextField
          ariaLabel="Birth year"
          label="Birth year"
          placeholder="Birth year"
          value={editedYear ? editedYear.toString() : ''}
          onChange={(val: string) => setEditedYear(val !== '' ? Number(val) : undefined)}
        />
      </div>
    </Modal>
  );
};

export default UserProfileModal;
