import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Trip } from '../types/types';
import DeleteTrip from './DeleteTripModal';
import { toast } from 'react-toastify';

export default function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.get<Trip>(`/trips/${id}`).then(res => setTrip(res.data));
  }, [id]);

const handleDeleted = () => {
    setShowDeleteModal(false);
    toast.success('Trip deleted');
    navigate('/');
  };

  if (!trip) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
      <p className="text-gray-500"><strong>Location:</strong> {trip.location}</p>
      <p className="text-sm text-gray-400 mb-4"><strong>Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}</p>
      <p className="mb-6 text-gray-200 whitespace-pre-line">{trip.story}</p>

      <h3 className="text-xl font-semibold mb-4">Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {trip.images.map(img => (
          <div key={img.id}>
            <img src={img.url} alt={img.caption} className="w-full h-auto rounded shadow" />
            <p className="mt-1 text-sm text-gray-400 text-center">{img.caption}</p>
          </div>
        ))}
      </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={() => setShowDeleteModal(true)}>
        Delete Trip
      </button>

      {showDeleteModal && (
        <DeleteTrip
          id={trip.id}
          title={trip.title}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}