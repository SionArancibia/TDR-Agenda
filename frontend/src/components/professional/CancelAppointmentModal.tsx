// src/components/CancelAppointmentModal.tsx
import React, { useState } from 'react';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [cancelReason, setCancelReason] = useState('');

  const handleSubmit = () => {
    onSubmit(cancelReason);
    setCancelReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Cancel Appointment</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;