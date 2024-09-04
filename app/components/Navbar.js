"use client";
import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleSignOut = () => {
    setShowDropdown(false);
    signOut();
  };

  const handleDropdownBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Delay for closing the dropdown
  };

  const handleDropdownFocus = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <nav className="flex justify-between items-center px-5 md:px-10 py-2 h-16 ">

      <div className="left">
      <Link href="/">
          <div className="flex items-center justify-center cursor-pointer">
          
            <h1 className="flex items-center text-xl font-bold pt-3">
            <span className="hidden md:block">Get Me Chai!</span>
            </h1>
            <img width={44} src="/tea.gif" alt="" />
          </div>
          </Link>
        </div>
      <div className="relative flex">
        {session && (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="mx-1 md:mx-2 bg-blue-700 hover:bg-blue-800  md:text-sm  md:px-5  inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700  mb-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
              type="button"
              onBlur={handleDropdownBlur}
              onFocus={handleDropdownFocus}
            >
              <span className="hidden md:inline">Welcome&nbsp;</span>
              <span>
               {session.user.email}
               </span>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              ref={dropdownRef}
              id="dropdown"
              className={`z-10 ${
                showDropdown ? "" : "hidden"
              } absolute top-11 left-[130px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
