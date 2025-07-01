import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [newTrip, setNewTrip] = useState({
    title: '', location: '', startDate: '', endDate: '', story: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTrip({ ...newTrip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/trips', newTrip);
    navigate(`/trip/${res.data.id}`);
  };

  return (
     <div className="w-full px-4 sm:px-8 flex justify-center">

    <form onSubmit={handleSubmit} className="w-[40vw] max-w-5xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-gray-500 text-2xl font-semibold mb-6 text-center">Create New Trip</h2>

      <label className="text-gray-500 block mb-1 font-medium" htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        placeholder="Trip Title"
        value={newTrip.title}
        onChange={handleChange}
        required
        className="text-gray-500 w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="text-gray-500 block mb-1 font-medium" htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        placeholder="Destination"
        value={newTrip.location}
        onChange={handleChange}
        required
        className="text-gray-500 w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="text-gray-500 block mb-1 font-medium" htmlFor="startDate">Start Date</label>
      <input
        id="startDate"
        name="startDate"
        type="date"
        value={newTrip.startDate}
        onChange={handleChange}
        required
        className="text-gray-500 w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="text-gray-500 block mb-1 font-medium" htmlFor="endDate">End Date</label>
      <input
        id="endDate"
        name="endDate"
        type="date"
        value={newTrip.endDate}
        onChange={handleChange}
        required
        className="text-gray-500 w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="text-gray-500 block mb-1 font-medium" htmlFor="story">Story</label>
      <textarea
        id="story"
        name="story"
        placeholder="Share your experience..."
        value={newTrip.story}
        onChange={handleChange}
        required
        rows={5}
        className="text-gray-500 w-full px-3 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create Trip
      </button>
    </form>
    </div>
  );
}
