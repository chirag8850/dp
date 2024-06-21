"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Toaster } from "@/app/meeting-scheduler/components/ui/sonner";

function DashboardLayout({ children }) {
  const { user, isSignedIn } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);

  const sidebarItems = [
    {
      id: 1,
      name: "Meeting Type",
      path: "/meeting-scheduler/dashboard/meeting-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/meeting-scheduler/dashboard/scheduled-meeting",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Availability",
      path: "/meeting-scheduler/dashboard/availability",
      icon: Clock,
    },
    {
      id: 4,
      name: "Settings",
      path: "/meeting-scheduler/dashboard/settings",
      icon: Settings,
    },
  ];

  const menu = [
    {
      id: 1,
      name: "About Us",
      href: "#",
    },
    {
      id: 2,
      name: "Services",
      href: "#",
    },
    {
      id: 3,
      name: "Resources",
      href: "#",
    },
    {
      id: 4,
      name: "Contact Us",
      href: "#",
    },
  ];

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
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
              <a href="#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-yellow-500">
                  Meeting Schedular
                </span>
              </a>
            </div>
            <div className="hidden lg:flex lg:flex-grow lg:justify-center">
              <ul className="flex space-x-4 lg:space-x-20">
                {menu.map((item, index) => (
                  <li>
                    <a
                      href={item.href}
                      className="text-white hover:text-yellow-500"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-5">
              {isSignedIn && (
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
              )}
              {!isSignedIn && (
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
              {menu.map((item, index) => (
                <li>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              {isSignedIn && (
                <li className="px-4 py-2">
                  <UserButton />
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      <div className="flex-grow flex flex-row mt-10 relative">
        <aside
          className={`fixed lg:relative w-64 lg:w-64 h-full border-r border-gray-200 bg-customGreen dark:bg-gray-800 dark:border-gray-700 ${
            sidebarOpen
              ? "translate-x-0 z-40"
              : "-translate-x-full lg:translate-x-0 lg:z-0"
          }`}
          style={{ zIndex: sidebarOpen ? 40 : 0 }}
        >
          <div className="h-full pb-4 overflow-y-auto relative">
            <div className="my-10 p-4">
              <div className="flex items-center">
                <Link href="/meeting-scheduler/create-meeting">
                  <Button className="flex gap-2 w-full mt-7 rounded-full">
                    <Plus /> Create
                  </Button>
                </Link>
              </div>
              <div className="my-6">
                <ul className="space-y-2 font-medium">
                  {sidebarItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.path}>
                        <Button
                          variant="ghost"
                          className={`flex items-center p-2 gap-2 text-white rounded-lg dark:text-white group transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-25 ${
                            activePath === item.path &&
                            "text-primary bg-blue-100"
                          }`}
                        >
                          <item.icon /> {item.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-grow p-10 lg:p-10 bg-gray-400 dark:bg-gray-800">
          <div className="bg-white rounded-xl p-4 mt-8 h-[90%] overflow-hidden ">
            <Toaster />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
