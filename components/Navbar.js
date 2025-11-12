'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
 


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.Full_Name ||
    'Guest User';
  const userEmail = user?.email || 'No email';
  const userContact =
    user?.contact ||
    user?.Contact_no ||
    user?.Contact_No ||
    user?.Contact ||
    user?.contact_no ||
    user?.contactNo ||
    user?.phone ||
    user?.Phone ||
    null;
  const contactDisplay = userContact || 'Not provided';
  const userBatch =
    user?.batch ||
    user?.Batch ||
    user?.batchYear ||
    user?.Batch_Year ||
    null;
  const batchDisplay = userBatch || 'Not provided';
  const roleDisplay = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : null;
  const avatarInitials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();


  // Unified sign-out handler: use redirect: false then client-side navigate.
  // This avoids waiting on server-side redirects that may hang on some setups.
  const handleSignOut = async (callbackUrl = '/') => {
    try {
      setIsSigningOut(true);
      await signOut({ redirect: false, callbackUrl });
      router.push(callbackUrl);
    } finally {
      setIsSigningOut(false);
    }
  };
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
                  className="border border-white px-4 py-2 rounded hover:bg-blue hover:text-green-700 transition"
                >
                  Login
                </button>
              </>
            ) : (
          <>
  {/* User Profile Dropdown */}
  <div className="relative inline-block my-3">
    {/* Profile Avatar Button */}
    <button
      id="avatarButton"
      type="button"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-11 h-11 rounded-full border-2 border-white cursor-pointer focus:outline-none overflow-hidden bg-white/10 backdrop-blur"
    >
      {user?.image ? (
        <img
          src={user.image}
          alt={`${displayName} avatar`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-500 to-blue-600 text-sm font-semibold text-blue-950">
          {avatarInitials}
        </div>
      )}
    </button>

    {/* Dropdown Menu */}
    {dropdownOpen && (
      <div
        id="userDropdown"
        className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 z-50"
      >
        {/* User Info */}
       <div className="px-4 py-4 text-sm text-gray-900 dark:text-white">
  <p className="text-base font-semibold">{displayName}</p>
  <p className="truncate text-xs text-gray-500 dark:text-gray-300">{userEmail}</p>
  <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
    <div>
      <p className="font-semibold text-[10px] text-gray-500 dark:text-gray-400">Contact</p>
      <p className="text-[12px] normal-case text-gray-700 dark:text-gray-200">
        {contactDisplay}
      </p>
    </div>
    <div>
      <p className="font-semibold text-[10px] text-gray-500 dark:text-gray-400">Batch</p>
      <p className="text-[12px] normal-case text-gray-700 dark:text-gray-200">
        {batchDisplay}
      </p>
    </div>
    {roleDisplay && (
      <div className="col-span-2">
        <p className="font-semibold text-[10px] text-gray-500 dark:text-gray-400">Role</p>
        <p className="text-[12px] normal-case text-gray-700 dark:text-gray-200">
          {roleDisplay}
        </p>
      </div>
    )}
  </div>
  {user?.enrollment && (
    <div className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-[11px] text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
      <span className="font-semibold uppercase tracking-wide text-[10px] text-gray-500 dark:text-gray-400">
        Enrollment
      </span>
      <div className="mt-1 text-[12px] normal-case">{user.enrollment}</div>
    </div>
  )}
</div>


        {/* Menu Links */}
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                router.push('/');
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                router.push('/');
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                router.push('/');
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Support
            </button>
          </li>
        </ul>

        {/* Sign Out */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => {
              setDropdownOpen(false);
              handleSignOut('/');
            }}
            disabled={isSigningOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white disabled:opacity-60"
          >
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </div>
    )}
  </div>
</>


          
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
            <div className="space-y-3 rounded-xl border border-white/10 bg-blue-900/60 p-4 text-sm text-blue-50">
              <div>
                <p className="text-lg font-semibold text-white">{displayName}</p>
                <p className="text-xs text-blue-100">{userEmail}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-blue-100/90">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-blue-200/80">Contact</p>
                  <p className="mt-1 text-sm text-white/90">{contactDisplay}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-blue-200/80">Batch</p>
                  <p className="mt-1 text-sm text-white/90">{batchDisplay}</p>
                </div>
                {roleDisplay && (
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-wide text-blue-200/80">Role</p>
                    <p className="mt-1 text-sm text-white/90">{roleDisplay}</p>
                  </div>
                )}
                {user?.enrollment && (
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-wide text-blue-200/80">Enrollment</p>
                    <p className="mt-1 text-sm text-white/90">{user.enrollment}</p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut('/');
                }}
                disabled={isSigningOut}
                className="w-full rounded-lg bg-yellow-400 py-2 font-semibold text-blue-950 transition hover:bg-yellow-300 disabled:opacity-60"
              >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
