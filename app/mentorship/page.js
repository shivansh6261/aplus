 "use client";

import React, { useState } from "react";
import "@/src/output.css";

const mentorshipData = [
  {
    id: 1,
    mentor: "Ravi Kapoor",
    expertise: "AI & ML",
    experience: "5 years at Google",
    available: true,
  },
  {
    id: 2,
    mentor: "Sneha Joshi",
    expertise: "Cybersecurity",
    experience: "Cybersecurity Lead at Infosys",
    available: false,
  },
];

export default function MentorshipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userID, setUserID] = useState("");

  const mentorshipCategories = [
    "Academic Guidance",
    "Career Planning",
    "Entrepreneurship",
    "Higher Education",
    "Industry Insights",
    "Personal Development",
    "Networking & Opportunities",
    "Other",
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("mentorshipCategories", selectedCategories.join(", "));
    console.log("Form submitted:", Object.fromEntries(formData));
    alert("Request submitted successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="p-10  min-h-screen w-400 m-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Mentorship Program
      </h1>

      {/* Request Mentorship Button */}
      <div className="mb-6 text-right text-blue-900">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-3xl hover:bg-blue-600 transition transform hover:scale-105"
        >
          Request Mentorship
        </button>
      </div>
{/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg relative m-4 border border-indigo-200">
      {/* Close Button */}
      <span
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold cursor-pointer transition-transform hover:scale-125"
      >
        &times;
      </span>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        Mentorship Request Form
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Enrollment No */}
        <div className="relative">
          <input
            type="text"
            name="Enrollment_No"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="peer border-2 border-indigo-300 rounded-xl w-full px-4 pt-6 pb-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white transition-all"
            placeholder=" "
            required
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm 
            peer-placeholder-shown:top-6 
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:text-base 
            transition-all">
            Enrollment No.
          </label>
        </div>

        {/* Categories with Pills */}
        <div className="relative">
          <label className="font-medium mb-2 block">Select Mentorship Categories</label>
          <div className="border-2 border-indigo-300 rounded-xl px-3 py-2 bg-white cursor-pointer focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
            <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
              {selectedCategories.length > 0 ? (
                selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {cat}
                    <button
                      type="button"
                      className="ml-1 text-indigo-600 hover:text-indigo-900 font-bold"
                      onClick={() => toggleCategory(cat)}
                    >
                      &times;
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">Select Categories</span>
              )}
            </div>

            {/* Dropdown checkboxes */}
            <div className="mt-2 max-h-40 overflow-y-auto border-t pt-2 space-y-1">
              {mentorshipCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 px-2 py-1 hover:bg-indigo-50 rounded-lg cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-indigo-500"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="relative">
          <textarea
            name="reason"
            placeholder=" "
            className="peer border-2 border-indigo-300 rounded-xl w-full px-4 pt-6 pb-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white resize-none transition-all min-h-[80px]"
            required
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm 
            peer-placeholder-shown:top-6 
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:text-base 
            transition-all">
            Reason for Requesting Mentorship
          </label>
        </div>

        {/* Preferred Mode */}
        <div className="relative">
          <select
            name="mode"
            className="border-2 border-indigo-300 rounded-xl w-full px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white transition-all"
            required
          >
            <option value="" disabled hidden>
              Select Preferred Mode
            </option>
            <option>Online</option>
            <option>In-person</option>
          </select>
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-3">
          <input type="checkbox" name="consent" required className="mt-1 accent-indigo-500" />
          <label className="text-gray-700 text-sm">
            I agree to share my details with the mentor and understand this is a voluntary guidance program.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
        >
          Submit Request
        </button>
      </form>
    </div>
  </div>
)}
      {/* Mentorship Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {mentorshipData.map(
          ({ id, mentor, expertise, experience, available }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-lg border border-indigo-200 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-900">{mentor}</h3>
              <p className="text-gray-700 mt-2">Expertise: {expertise}</p>
              <p className="text-sm text-gray-600">Experience: {experience}</p>
              <span
                className={`inline-block mt-4 px-3 py-1 text-sm rounded-full ${
                  available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {available ? "Available for Mentorship" : "Not Available"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
