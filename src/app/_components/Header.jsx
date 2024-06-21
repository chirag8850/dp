"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const { user, isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50 mt-6">
        <nav className="flex lg:flex-1">
          <div className="flex w-full mx-auto px-12 py-2 justify-between items-center">
            <div className="flex justify-start">
              <Image src="/logo.png" alt="Logo" width={60} height={50} />
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
              <Link
                href="/services"
                className="text-white hover:text-yellow-500"
              >
                ChatBot
              </Link>
              <Link
                href="/chatbot"
                className="text-white hover:text-yellow-500"
              >
                IDP
              </Link>

              <Link
                href={isSignedIn ? "/documents" : "/sign-in"}
                className="text-white hover:text-yellow-500"
              >
                Documents
              </Link>
              <Link
                href="/meeting-scheduler"
                className="text-white hover:text-yellow-500"
              >
                Meeting Schedule
              </Link>
              <Link
                href="/contact-us"
                className="text-white hover:text-yellow-500"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex gap-5">
              <Link href={"/sign-in"}>
                <Button className="bg-yellow-500 hover:bg-yellow-500">
                  Book A Demo
                </Button>
              </Link>

              {isSignedIn ? (
                <UserButton />
              ) : (
                <Link href={"/sign-in"}>
                  <Button className="bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-2 px-4 rounded">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <img className="h-8 w-auto" src={UserButton} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/services"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    ChatBot
                  </Link>
                  <Link
                    href="/chatbot"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    IDP
                  </Link>
                  <Link
                    href="/documents"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Documents
                  </Link>
                  <Link
                    href="/meeting-scheduler"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                   Meeting Schedule
                  </Link>
                  <Link
                    href="/contact-us"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                   Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

export default Header;
