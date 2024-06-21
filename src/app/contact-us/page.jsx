"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import Footer from "../_components/sections/Footer";
import Image from "next/image";

export default function ContactPage() {
  const { user, isSignedIn } = useUser();

  return (
    <>
      <div className="bg-customGreen contact">
        <nav className="flex justify-between items-center p-8">
          <div className="flex-shrink-0">
          <div className="">
              <Image src="/logo.png" alt="Logo" width={60} height={50}/>
            </div>
          </div>

          <div className="flex-grow flex justify-center space-x-20 text-lg">
            <a href="/services" className="text-white hover:text-yellow-500">
              ChatBot
            </a>
            <a href="/chatbot" className="text-white hover:text-yellow-500">
              IDP
            </a>
            <a href="/documents" className="text-white hover:text-yellow-500">
              Document
            </a>
            <a href="/meeting-scheduler" className="text-white hover:text-yellow-500">
              Meeting Schedule
            </a>
          </div>
          <div className="flex-shrink-0">
            <UserButton />
          </div>
        </nav>
        <div className="p-8 mt-4">
          <div className="text-yellow-500 font-semibold text-4xl">
            Contact Us !
          </div>
          <div className="text-white mt-4 font-extralight tracking-wide">
            Book online. We’ll provide you with a trusted, excellent services
            most <br />
            accurate and fair-price service Estimate.
          </div>
        </div>  
       
      </div>
      
      <div className="bg-white contactMain p-8">
        <div className="p-8">
          <div className="contact-container flex p-4">
            <div className="contact-util p-6">
              <div className="text-black text-xl font-semibold tracking-wide">
                What Happens Next?
              </div>
              <div className="text-black font-normal tracking-wide mt-2 mb-4">
                Book online. We’ll provide you with a trusted, <br />
                excellent service, most accurate, and fair-price <br />
                service estimate.
              </div>
              <div>
                <div className="relative timeline-container">
                  <div className="flex items-start mb-6 timeline-item relative">
                    <div className="timeline-circle bg-yellow-300 border-black rounded-full px-4 flex items-center justify-center h-8 w-8">
                      1
                    </div>
                    <div className="ml-8">
                      <div className="text-black font-normal">
                        Having received and processed your request, we will get
                        back to you shortly to detail your project needs and
                        sign an NDA to ensure the confidentiality of
                        information.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start mb-6 timeline-item relative">
                    <div className="timeline-circle bg-yellow-300 border-black rounded-full px-4 flex items-center justify-center h-8 w-8">
                      2
                    </div>
                    <div className="ml-8">
                      <div className="text-black font-normal">
                        After examining requirements, our analysts and
                        developers devise a project proposal with the scope of
                        works, team size, time and cost estimates.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start mb-6 timeline-item relative">
                    <div className="timeline-circle bg-yellow-300 border-black rounded-full px-4 flex items-center justify-center h-8 w-8 mb-6">
                      3
                    </div>
                    <div className="ml-8">
                      <div className="text-black font-normal">
                        We arrange a meeting with you to discuss the offer and
                        come to an agreement.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start timeline-item relative">
                    <div className="timeline-circle bg-yellow-300 border-black rounded-full px-4 flex items-center justify-center h-8 w-8">
                      4
                    </div>
                    <div className="ml-8">
                      <div className="text-black font-normal">
                        We sign a contract and start working on your project as
                        quickly as possible.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="px-20 form absolute">
                <div className="bg-white rounded-t-lg flex align-center justify-center px-9 py-5">
                  <div>
                    <img src="./email.png" className="form-icon" alt="" />
                  </div>
                  <div className="ml-5 mt-3 tracking-wide">
                    Write us the few words and book online & We’ll provide you
                    with a trusted, excellent services.
                  </div>
                </div>
                <div className="bg-gray-400 rounded-b-lg p-10">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name*"
                      className="w-full py-2 px-4 border border-gray-300"
                    />
                    <div className="mt-6">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email*"
                        className="w-full py-2 px-4 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mt-6">
                      <textarea
                        name="message"
                        id="message"
                        rows="6"
                        placeholder="Message*"
                        className="w-full py-2 px-4 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 md:mt-8">
                      <div className="text-justify text-xs w-full md:w-3/4 mb-4 md:mb-0">
                        Please be informed that when you click the Send button
                        Innowise Group will process your personal data in
                        accordance with our Privacy Policy for the purpose of
                        providing you with appropriate information.
                      </div>
                      <div className="ml-0 md:ml-1">
                        <button className="bg-yellow-500 text-white px-6 py-2 flex items-center rounded hover:bg-yellow-600 transition">
                          Send
                          <img src="./arrow.png" alt="" className="w-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
