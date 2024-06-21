import React from "react";

function Contact() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-slate-200 p-6 md:p-10">
        <div className="mx-4 md:mx-12 mb-6 md:mb-10">
          <div className="text-xl md:text-2xl font-bold tracking-wide mt-6">
            Contact Us!
          </div>
          <div className="text-justify mt-4 text-sm md:text-base">
            Book online. We’ll provide you with a trusted, excellent services
            most accurate and fair-price service Estimate.
          </div>
          <div className="mt-6 md:mt-8">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name*"
              className="w-full py-2 px-4 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-6 md:mt-8">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email*"
              className="w-full py-2 px-4 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-6 md:mt-8">
            <textarea
              name="message"
              id="message"
              rows="6"
              placeholder="Message*"
              className="w-full py-2 px-4 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 md:mt-8">
            <div className="text-justify text-xs w-full md:w-3/4 mb-4 md:mb-0">
              Please be informed that when you click the Send button Innowise
              Group will process your personal data in accordance with our
              Privacy Policy for the purpose of providing you with appropriate
              information.
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
      <div className=" md:w-1/2  p-6 md:p-0">
        <img
              width={761}
              height={542}
              src="./contact.png"
              className="mt-32 "
              alt="Overlay Image"
            />
        
      </div>
    </div>
  );
}

export default Contact;
