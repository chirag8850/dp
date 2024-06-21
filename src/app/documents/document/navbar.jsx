import { useState } from "react";

export default function Navbar({ onSearchChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <nav className="bg-white border-green-600 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-customGreen">
            Documents
          </span>
        </div>
        <div className="flex items-center space-x-5 mt-4 md:mt-0">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="block w-full md:w-64 pl-10 pr-2 py-2 text-sm text-black rounded-2xl bg-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-700"
              placeholder="Search..."
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm text-black bg-gray-200 rounded-2xl border focus:outline-none hover:bg-gray-100 transition-all duration-150 ease-in-out">
            <img
              src="/upload.svg"
              className="w-4 h-4 mr-2 text-green"
              alt="Upload Icon"
            />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
