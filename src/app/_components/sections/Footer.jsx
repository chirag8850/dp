import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-customGreen p-10">
        <div>
        <div className="flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={60} height={50} />
            </div>
          <div className="px-10 mt-10">
            <div className="border-t border-1 border-white w-full"></div>
            <div className="flex flex-col md:flex-row justify-between mt-10 space-y-8 md:space-y-0 md:space-x-4">
              {/* Reach Us Section */}
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-2 text-white">Reach Us</h2>
                <ul className="text-slate-300 text-sm">
                  <li className="flex items-center mt-6">
                    <span className="mr-2">
                      <img src="./call.png" alt="" className="w-6" />
                    </span>
                    <span className="ml-4">Phone: +1234567890</span>
                  </li>
                  <li className="flex items-center mt-6">
                    <span className="mr-2">
                      <img src="./mess.png" alt="" className="w-5" />
                    </span>
                    <span className="ml-4">Email: info@example.com</span>
                  </li>
                  <li className="flex items-center mt-6">
                    <span className="mr-2">
                      <img src="./location.png" alt="" className="w-10" />
                    </span>
                    <span className="ml-4">
                      132 Dartmouth Street Boston, Massachusetts 02156 United
                      States
                    </span>
                  </li>
                </ul>
              </div>

              {/* Company Section */}
              <div className="w-full md:w-1/4 lg:w-1/6">
                <h2 className="font-bold text-lg mb-2 text-white">Company</h2>
                <ul className="text-slate-300">
                  <li className="mt-6">About</li>
                  <li className="mt-6">Contact</li>
                  <li className="mt-6">Blog</li>
                </ul>
              </div>

              {/* Legal Section */}
              <div className="w-full md:w-1/4 lg:w-1/6">
                <h2 className="font-bold text-lg mb-2 text-white">Legal</h2>
                <ul className="text-slate-300">
                  <li className="mt-6">Privacy Policy</li>
                  <li className="mt-6">Terms and Service</li>
                  <li className="mt-6">Terms of Use</li>
                  <li className="mt-6">Refund Policy</li>
                </ul>
              </div>

              {/* Quick Links Section */}
              <div className="w-full md:w-1/4 lg:w-1/6">
                <h2 className="font-bold text-lg mb-2 text-white">
                  Quick Links
                </h2>
                <ul className="text-slate-300">
                  <li className="mt-6">Techlabz Keybox</li>
                  <li className="mt-6">Downloads</li>
                  <li className="mt-6">Forum</li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="flex-1 w-full max-w-lg">
                <div className="mb-4 px-6 py-8 bg-white bg-opacity-50 rounded shadow-md">
                  <h2 className="font-bold text-lg mb-2 text-black">
                    Join our Newsletter
                  </h2>
                  <div className="flex mt-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="p-2 border border-gray-300 rounded-l w-full"
                    />
                    <button className="p-2 bg-black text-white rounded-r">
                      Subscribe
                    </button>
                  </div>
                  <div className="mt-4 text-gray-300">
                    * Will send you weekly updates for your better tool
                    management.
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <div className="bg-black text-white p-2 rounded-full flex items-center justify-center h-10 w-10">
                    <img
                      src="./instagram.png"
                      alt="Instagram"
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="bg-black text-white p-2 rounded-full flex items-center justify-center h-10 w-10">
                    <img
                      src="./linkedin.png"
                      alt="LinkedIn"
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="bg-black text-white p-2 rounded-full flex items-center justify-center h-10 w-10">
                    <img
                      src="./youtube.png"
                      alt="YouTube"
                      className="h-4 w-6"
                    />
                  </div>
                  <div className="bg-black text-white p-2 rounded-full flex items-center justify-center h-10 w-10">
                    <img
                      src="./twitter.png"
                      alt="Twitter"
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="bg-black text-white p-2 rounded-full flex items-center justify-center h-10 w-10">
                    <img
                      src="./facebk.png"
                      alt="Facebook"
                      className="h-4 w-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
