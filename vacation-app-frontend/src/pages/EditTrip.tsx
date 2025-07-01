import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import type { Trip } from '../types/types';

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    title: '', location: '', startDate: '', endDate: '', story: ''
  });
  

  useEffect(() => {
    if (!id) return;
    api.get<Trip>(`/trips/${id}`).then(res => {
      const { title, location, startDate, endDate, story } = res.data;
      setTripData({
        title,
        location,
        startDate: startDate.split('T')[0],
        endDate: endDate.split('T')[0],
        story
      });
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  function handleCancel() {
    navigate(`/trip/${id}`);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await api.patch(`/trips/${id}`, tripData);
      navigate(`/trip/${id}`);
    }
  };

  return (
 <div className="w-full px-4 sm:px-8 flex justify-center">
    <form onSubmit={handleSubmit} className="w-[40vw] max-w-5xl p-6 bg-white rounded-lg shadow-md">
   
      <h2 className="text-gray-500 text-2xl font-bold mb-6 text-center">Edit Trip</h2>

      <label className="text-gray-500 block mb-2 font-medium">Title</label>
      <input name="title" value={tripData.title} onChange={handleChange} required className="text-gray-800 w-full p-2 mb-4 border rounded" />

      <label className="text-gray-500 block mb-2 font-medium">Location</label>
      <input name="location" value={tripData.location} onChange={handleChange} required className="text-gray-800 w-full p-2 mb-4 border rounded" />

      <label className="text-gray-500 block mb-2 font-medium">Start Date</label>
      <input type="date" name="startDate" value={tripData.startDate} onChange={handleChange} required className="text-gray-800 w-full p-2 mb-4 border rounded" />

      <label className="text-gray-500 block mb-2 font-medium">End Date</label>
      <input type="date" name="endDate" value={tripData.endDate} onChange={handleChange} required className="text-gray-800 w-full p-2 mb-4 border rounded" />

      <label className="text-gray-500 block mb-2 font-medium">Story</label>
      <textarea name="story" rows={5} value={tripData.story} onChange={handleChange} required className="text-gray-800 w-full p-2 mb-6 border rounded" />
      
      <div className="flex gap-4">
        <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 border border-gray-500 text-black rounded hover:bg-gray-100 whitespace-nowrap">Cancel</button>
        <button type="submit" className="flex-grow px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap">Save Changes</button>
      </div>
    </form>
    </div>
  );
}
