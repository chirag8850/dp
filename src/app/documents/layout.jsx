"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DocumentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <div className="relative flex flex-col h-screen">
      <nav className="fixed top-0 z-50 w-full bg-customGreen border-b border-gray-200 dark:border-gray-700 p-3">
        <div className="px-3 py-5 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-yellow-500">
                  Document
                </span>
              </a>
            </div>
            <div className="hidden lg:flex lg:flex-grow lg:justify-center">
              <ul className="flex space-x-4 lg:space-x-20">
                <li>
                  <a href="#" className="text-white hover:text-yellow-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-yellow-500">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-yellow-500">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-yellow-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-5">
              {isSignedIn ? (
                <>
                  <img
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer lg:hidden"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  <div className="hidden lg:flex">
                    <UserButton />
                  </div>
                </>
              ) : (
                <Link href="/sign-in">
                  <Button className="bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-2 px-4 rounded">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 lg:hidden">
            <ul className="py-1">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </li>
              {isSignedIn && (
                <li className="px-4 py-2">
                  <UserButton />
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      <div className="flex-grow flex flex-row mt-16 relative">
        <aside
          className={`fixed lg:relative w-64 h-full border-r border-gray-200 bg-customGreen dark:bg-gray-800 dark:border-gray-700 ${
            sidebarOpen
              ? "translate-x-0 z-40"
              : "-translate-x-full lg:translate-x-0 lg:z-0"
          }`}
          style={{ zIndex: sidebarOpen ? 40 : 0 }}
        >
          <div className="h-full pb-4 overflow-y-auto relative">
            <div className="my-10 p-4">
              <div className="flex items-center">
                {isSignedIn && user && user.imageUrl && (
                  <img
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="w-10 h-10 mr-4 rounded-full"
                  />
                )}
                {isSignedIn && user && (
                  <div>
                    <p className="text-white text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-white text-xs">
                      {user.primaryEmailAddress.emailAddress}
                    </p>
                  </div>
                )}
              </div>
              <div className="my-6">
                <ul className="space-y-2 font-medium">
                  <li>
                    <Link
                      href="/documents/dashboard"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25"
                    >
                      <Image
                        src="/dashboard.png"
                        alt="Dashboard"
                        width={20}
                        height={20}
                      />
                      <span className="ml-3">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documents/document"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25"
                    >
                      <Image
                        src="/doc.png"
                        alt="Documents"
                        width={20}
                        height={20}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Documents
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documents/folder"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25"
                    >
                      <Image
                        src="/folder.png"
                        alt="Folder"
                        width={20}
                        height={20}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Folder
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documents/uploads"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25"
                    >
                      <Image
                        src="/upload.png"
                        alt="Upload"
                        width={20}
                        height={20}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Upload
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documents/setting"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25"
                    >
                      <Image
                        src="/setting.png"
                        alt="Settings"
                        width={20}
                        height={20}
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Settings
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute bottom-18 left-0 right-0 px-4">
              <button className="flex items-center justify-center text-bold font-normal w-full py-3 px-10 text-black bg-yellow-500 hover:bg-yellow-600 transition duration-300 rounded-3xl">
                Create New
                <Image
                  src="/plus.png"
                  alt="Create New"
                  width={16}
                  height={16}
                  className="ml-2 mt-1 mb-1"
                />
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-grow p-10 bg-gray-400 dark:bg-gray-800">
          <div className="bg-white rounded-xl p-4 mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
