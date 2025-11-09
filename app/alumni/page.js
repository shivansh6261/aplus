// AlumniPage.jsx
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import "@/src/output.css"
import { db } from "@/config/db.js";

// Fancy Alumni Card Component
const AlumniCard = ({ Full_Name, Batch, imgUrl, linkedIn }) => (
  <div className="relative bg-white/20 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-6 w-72 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 mb-4">
        <img
          src={imgUrl || "profile.jpeg"} // fallback if imgUrl not available
          alt={Full_Name}
          className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
        />
        <span className="absolute -bottom-3 right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
          {Batch}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{Full_Name}</h3>
      <a
        href={linkedIn || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <FaLinkedin className="text-lg" />
        <span className="text-sm">View LinkedIn</span>
      </a>
    </div>
  </div>
);

// Alumni Page
const AlumniPage = async () => {
  const [alumniData] = await db.execute("SELECT * FROM alumni");

  return (
    <>
  
    <div className="min-h-screen py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        CSE Alumni Network
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {alumniData.map((alumni) => (
          <AlumniCard
            key={alumni.ID}
            Full_Name={alumni.Full_Name}
            Batch={alumni.Batch}
            imgUrl={alumni.imgUrl}
            linkedIn={alumni.linkedIn}
          />
        ))}
      </div>
    </div>
  </>
  );
};

export default AlumniPage;
