"use client";
import React, { useState } from 'react';
import "@/src/output.css"
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        fullName: '',
        enrollmentNumber: '',
        email: '',
        contact: '',
        batchYear: '',
        course: '',
        password: '',
        confirmPassword: '',
        idCard: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'idCard' && files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleContinue = () => {
        // TODO: Add validation and backend integration here
        console.log('Role:', role);
        console.log('Form Data:', formData);

        // Redirect after "registration"
        router.push(`/login?next=registered&role=${role}`);
    };

    return (
        <div className="min-h-[100vh] flex items-center justify-center px-4 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>

                {/* Role Selection */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">I am a</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`px-3 py-2 rounded border text-sm ${role === 'student'
                                ? 'bg-blue-950 text-white border-blue-950'
                                : 'bg-white text-gray-800 border-gray-300'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('alumni')}
                            className={`px-3 py-2 rounded border text-sm ${role === 'alumni'
                                ? 'bg-blue-950 text-white border-blue-950'
                                : 'bg-white text-gray-800 border-gray-300'
                                }`}
                        >
                            Alumni
                        </button>
                    </div>
                </div>

                {/* Dynamic Form Fields */}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    {role === 'student' && (
                        <input
                            type="text"
                            name="enrollmentNumber"
                            placeholder="Enrollment Number"
                            value={formData.enrollmentNumber}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    {role === 'alumni' && (
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select Course</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                        </select>
                    )}

                    {role == 'alumni' && 
                    (<select
                        name="batchYear"
                        value={formData.batchYear}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select Batch Year</option>
                        {Array.from({ length: new Date().getFullYear() - 1983 + 1 }, (_, i) => 1983 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    )}
                        {role == 'student' && 
                    (<select
                        name="batchYear"
                        value={formData.batchYear}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select Batch Year</option>
                        {Array.from({ length: new Date().getFullYear()-2020 + 1}, (_, i) => 2020 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    )}


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="file"
                        name="idCard"
                        accept="image/*,.pdf"
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full bg-yellow-400 text-green-900 py-2 rounded hover:bg-yellow-300"
                    >
                        Register as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="w-full border border-blue-950 text-blue-950 py-2 rounded hover:bg-blue-50"
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
