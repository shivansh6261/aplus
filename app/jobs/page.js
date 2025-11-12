// app/jobs/page.jsx
import React from 'react';
import "@/src/output.css"
import { db } from "@/config/db.js";

const JobsPage = async () => {
  const [jobs_internship] = await db.execute("SELECT * FROM `job and internship`");

  return (
    <div className="p-10 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Job Openings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs_internship.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow border border-green-200 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{job.Title}</h3>
            <div className="text-sm text-gray-700 mb-1"><strong>Type:</strong> {job.Type}</div>
            <div className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {job.Location}</div>
            <div className="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {job.Duration}</div>
            <div className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {job.Description}</div>
            <div className="text-sm text-gray-700 mb-1"><strong>Requirement:</strong> {job.Requirement}</div>
            <div className="text-sm text-gray-700 mb-2"><strong>Benefits:</strong> {job.Benefits}</div>
            <p className="text-xs text-gray-500">Posted: {job.Posted}</p>
            <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
