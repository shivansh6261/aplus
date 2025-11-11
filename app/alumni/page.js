// // AlumniPage.jsx
// import React from 'react';
// import { FaLinkedin } from 'react-icons/fa';
// import "@/src/output.css"
// import { db } from "@/config/db.js";

// // Fancy Alumni Card Component
// const AlumniCard = ({ Full_Name, Batch, imgUrl, linkedIn }) => (
//   <div className="relative bg-white/20 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-6 w-72 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//     <div className="flex flex-col items-center">
//       <div className="relative w-28 h-28 mb-4">
//         <img
//           src={imgUrl || "profile.jpeg"} // fallback if imgUrl not available
//           alt={Full_Name}
//           className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
//         />
//         <span className="absolute -bottom-3 right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
//           {Batch}
//         </span>
//       </div>
//       <h3 className="text-xl font-semibold text-gray-900">{Full_Name}</h3>
//       <a
//         href={linkedIn || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
//       >
//         <FaLinkedin className="text-lg" />
//         <span className="text-sm">View LinkedIn</span>
//       </a>
//     </div>
//   </div>
// );

// // Alumni Page
// const AlumniPage = async () => {
//   const [alumniData] = await db.execute("SELECT * FROM alumni");

//   return (
//     <>
  
//     <div className="min-h-screen py-12 px-4">
//       <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
//         CSE Alumni Network
//       </h1>
//       <div className="flex flex-wrap justify-center gap-10">
//         {alumniData.map((alumni) => (
//           <AlumniCard
//             key={alumni.ID}
//             Full_Name={alumni.Full_Name}
//             Batch={alumni.Batch}
//             imgUrl={alumni.imgUrl}
//             linkedIn={alumni.linkedIn}
//           />
//         ))}
//       </div>
//     </div>
//   </>
//   );
// };

// export default AlumniPage;
"use client";
import React, { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import "@/src/output.css";

const AlumniCard = ({ Full_Name, Batch, imgUrl, linkedIn }) => (
  <div className="relative bg-white/20 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-6 w-72 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 mb-4">
        <img
          src={imgUrl || "profile.jpeg"}
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

export default function AlumniPage() {
  const [alumniData, setAlumniData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAlumni = async (query = "") => {
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setAlumniData(data);
    setLoading(false);
  };

  useEffect(() => {
    // ✅ Fetch all alumni when page loads
    fetchAlumni();
  }, []);

  useEffect(() => {
    // ✅ Fetch filtered data when user types
    const delay = setTimeout(() => {
      fetchAlumni(searchQuery);
    }, 300); // debounce
    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="min-h-screen py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        CSE Alumni Network
      </h1>

      {/* 🔍 Search Input */}
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="🔍 Search by name or batch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : alumniData.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10 mt-4">
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
      ) : (
        <p className="text-gray-500 text-center mt-10">No alumni found.</p>
      )}
    </div>
  );
}
