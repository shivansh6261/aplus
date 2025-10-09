// AnnouncementsPage.jsx
import React from 'react';
import "@/src/output.css"

const announcements = [
  {
    id: 1,
    title: 'Annual Alumni Meet 2025',
    content: 'Join us for the CSE Alumni Meet on December 15th, 2025 at the Main Auditorium.'
  },
  {
    id: 2,
    title: 'New Campus Innovation Lab Inauguration',
    content: 'The alumni-funded innovation lab will be inaugurated next month. All are welcome!'
  }
];

const AnnouncementsPage = () => {
  return (
    <div className="p-10  min-h-screen w-400 m-auto  ">
      <h1 className="text-3xl font-bold text-center text-yellow-800 mb-8">Announcements</h1>
      <div className="space-y-6">
        {announcements.map(({ id, title, content }) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow border border-yellow-200 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-yellow-900">{title}</h3>
            <p className="text-gray-700 mt-2">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
