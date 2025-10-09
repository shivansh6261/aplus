'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <span>Alumni</span><span className="text-yellow-300">Plus</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-lg font-mono">
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link href="/alumni" className="hover:text-yellow-300 transition">Alumni</Link>
            <Link href="/mentorship" className="hover:text-yellow-300 transition">Mentorship</Link>
            <Link href="/jobs" className="hover:text-yellow-300 transition">Jobs</Link>
            <Link href="/endownment" className="hover:text-yellow-300 transition">Endowment</Link>
            <Link href="/announcements" className="hover:text-yellow-300 transition">Announcements</Link>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {!session ? (
              <>
                <Link href="/register">
                  <button className="bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300 transition">
                    Join Network
                  </button>
                </Link>
                <button
                  onClick={() => signIn()}
                  className="border border-white px-4 py-2 rounded hover:bg-white hover:text-green-700 transition"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="border border-white px-4 py-2 rounded hover:bg-white hover:text-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-yellow-300">Home</Link>
          <Link href="/alumni" className="block hover:text-yellow-300">Alumni</Link>
          <Link href="/mentorship" className="block hover:text-yellow-300">Mentorship</Link>
          <Link href="/jobs" className="block hover:text-yellow-300">Jobs</Link>
          <Link href="/endownment" className="block hover:text-yellow-300">Endowment</Link>
          <Link href="/announcements" className="block hover:text-yellow-300">Announcements</Link>

          {!session ? (
            <>
              <Link href="/register">
                <button className="w-full bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300">
                  Join Network
                </button>
              </Link>
              <button
                onClick={() => signIn()}
                className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-green-700"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
