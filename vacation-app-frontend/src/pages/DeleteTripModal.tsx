import { useState } from 'react';
import { api } from '../services/api';

interface DeleteTripModalProps {
  id: string;
  title: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteTripModal({ id, title, onClose, onDeleted }: DeleteTripModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    api.delete(`/trips/${id}`)
      .then(() => {
        console.log('Trip deleted');
        onDeleted();
      })
      .catch(err => {
        console.error('Delete failed:', err);
        setError('Failed to delete trip.');
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="text-gray-500 max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Trip</h2>
        <p className="mb-4">Are you sure you want to delete the trip "<strong>{title}</strong>"?</p>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 border border-gray-500 text-black rounded hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Trip'}
          </button>
        </div>
      </div>
    </div>
  );
}
