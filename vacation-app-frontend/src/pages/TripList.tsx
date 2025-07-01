import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Trip } from '../types/types';
import { Link } from 'react-router-dom';
import DeleteTrip from './DeleteTripModal';
import { toast } from 'react-toastify';

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    api.get<Trip[]>('/trips').then(res => {
      const sortedTrips = res.data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      setTrips(sortedTrips);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      <div className="space-y-4">
        {trips.map(trip => (
          <div key={trip.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                <Link to={`/trip/${trip.id}`} className="text-blue-600 hover:underline">
                  {trip.title}
                </Link>
              </h2>
              <div className="flex space-x-4">
                <Link to={`/trip/${trip.id}/edit`} className="text-sm text-blue-500 hover:underline">
                  Edit
                </Link>
                <a href = "#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTripToDelete(trip);
                    setShowDeleteModal(true);
                  }}
                  className="text-sm text-blue-500 hover:underline">
                  Delete
                </a>
              </div>
            </div>
            <p className="text-gray-300">{trip.location}</p>
            <p className="text-sm text-gray-500">
              {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-100">{trip.story}</p>

          </div>

        ))}
        {showDeleteModal && tripToDelete && (
          <DeleteTrip
            id={tripToDelete.id}
            title={tripToDelete.title}
            onClose={() => setShowDeleteModal(false)}
            onDeleted={() => {
              setShowDeleteModal(false);
              setTripToDelete(null);
              toast.success('Trip deleted');
              fetchTrips(); 
            }}
          />
        )}
      </div>
    </div>
  );
}