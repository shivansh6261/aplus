"use client";
import React, { useState } from 'react';
import "@/src/output.css"
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


const Login = () => {
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [course, setCourse] = useState('B.Tech');
  const [enrollment, setEnrollment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ show/hide password toggle

 
 const handleLogin = async () => {
  if (role === 'student' && (!enrollment || !password)) {
    alert('Please enter enrollment number and password.');
    return;
  }

  if (role === 'faculty' && (!employeeId || !password)) {
    alert('Please enter employee ID and password.');
    return;
  }

  if (role === 'alumni' && (!email || !password)) {
    alert('Please enter email and password.');
    return;
  }

  const res = await signIn('credentials', {
    redirect: false,
    role,
    enrollment,
    employeeId,
    email,
    password,
  });

  if (res.ok) {
    alert('Login successful');
    router.push('/'); // Or wherever you want
  } else {
    alert('Login failed');
  }
};


  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">  <span>Alumni</span><span className="text-yellow-300">Plus</span></h1>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="block font-bold text-2xl text-gray-700">I am :</label>
          <div className="grid grid-cols-3 gap-2">
            {['student', 'faculty', 'alumni'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-3 py-2 rounded border text-sm ${role === r
                    ? 'bg-blue-950 text-white border-blue-950'
                    : 'bg-white text-gray-800 border-gray-300'
                  }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Inputs */}
        <div className="space-y-4">
          {role === 'student' && (
            <>
              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </div>

              {/* Enrollment Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Enrollment Number</label>
                <input
                  type="text"
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                  placeholder="Enter your enrollment no"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </>
          )}

          {role === 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter your employee ID"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}

          {role === 'alumni' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}

          {/* Password Input with Eye Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  // 👁️ Eye Off
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-9s4.477-9 10-9c1.2 0 2.36.2 3.438.573M19.07 4.93a10.02 10.02 0 011.43 3.07M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  // 👁️ Eye
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.269 2.943 9.542 7-1.273 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-950 text-white py-2 rounded hover:opacity-90"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full border border-blue-950 text-blue-950 py-2 rounded hover:bg-blue-50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
