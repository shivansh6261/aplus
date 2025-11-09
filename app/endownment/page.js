// // EndowmentPage.jsx
// "use client";
// import React from 'react';
// import { useRouter } from "next/navigation";
// import "@/src/output.css"

// const endowments = [
//   {
//     id: 1,
//     title: 'Women in Tech Scholarship',
//     amount: '₹5,00,000',
//     donor: 'Alumni Association 2010 Batch',
//     year: 2024
//   },
//   {
//     id: 2,
//     title: 'Research Grant - AI Projects',
//     amount: '₹10,00,000',
//     donor: 'Sundar Dev',
//     year: 2025
//   }
// ];

// const EndowmentPage = () => {
//   return (
//     <>
//     <div className="p-10  min-h-screen w-400 m-auto">
//       <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Endowment Programs</h1>
//             <div className="mb-6 text-right text-blue-900">
//         <button
//           onClick={() => router.push("/donate")}
//           className="bg-blue-500 text-white px-6 py-2 rounded-3xl hover:bg-blue-600 transition"
//         >
//           Donate Now
//         </button>
//       </div>
 
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {endowments.map(({ id, title, amount, donor, year }) => (
//           <div key={id} className="bg-white p-6 rounded-lg border border-blue-200 shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
//             <p className="text-blue-700 mt-2">Amount: {amount}</p> 
//             <p className="text-sm text-gray-600">Donor: {donor}</p>
//             <p className="text-sm text-gray-600">Year: {year}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default EndowmentPage;

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import
import "@/src/output.css";

const endowments = [
  {
    id: 1,
    title: "Women in Tech Scholarship",
    amount: "₹5,00,000",
    donor: "Alumni Association 2010 Batch",
    year: 2024,
  },
  {
    id: 2,
    title: "Research Grant - AI Projects",
    amount: "₹10,00,000",
    donor: "Sundar Dev",
    year: 2025,
  },
];

export default function EndowmentPage() {
  const router = useRouter(); // ✅ Must be inside the component

  return (
    <div className="p-10  min-h-screen w-400 m-auto">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Endowment Programs
      </h1>

      <div className="mb-6 text-right text-blue-900">
        <button
          onClick={() => router.push("/donate")} // ✅ use router here
          className="bg-blue-500 text-white px-6 py-2 rounded-3xl hover:bg-blue-600 transition"
        >
          Donate Now
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {endowments.map(({ id, title, amount, donor, year }) => (
          <div
            key={id}
            className="bg-white p-6 rounded-lg border border-blue-200 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
            <p className="text-blue-700 mt-2">Amount: {amount}</p>
            <p className="text-sm text-gray-600">Donor: {donor}</p>
            <p className="text-sm text-gray-600">Year: {year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
