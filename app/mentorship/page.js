// MentorshipPage.jsx
import React from 'react';
import "@/src/output.css"

const mentorshipData = [
  {
    id: 1,
    mentor: 'Ravi Kapoor',
    expertise: 'AI & ML',
    experience: '5 years at Google',
    available: true
  },
  {
    id: 2,
    mentor: 'Sneha Joshi',
    expertise: 'Cybersecurity',
    experience: 'Cybersecurity Lead at Infosys',
    available: false
  }
];

const MentorshipPage = () => {
  return (
    <div className="p-10 min-h-screen w-400 m-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Mentorship Program</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mentorshipData.map(({ id, mentor, expertise, experience, available }) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{mentor}</h3>
            <p className="text-gray-600 mt-2">Expertise: {expertise}</p>
            <p className="text-gray-500">Experience: {experience}</p>
            <span className={`inline-block mt-4 px-3 py-1 text-sm rounded-full ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {available ? 'Available for Mentorship' : 'Not Available'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipPage;
