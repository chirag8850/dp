import React from "react";

function About() {
  return (
    <div className="p-4 md:p-10 md:px-15 flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-1/2 px-4 py-10 md:px-16">
        <div className="flex items-center">
          <div className="border-t border-2 border-yellow-500 w-16 mr-4"></div>
          <span className="text-customYellow text-md uppercase">
            About Company
          </span>
        </div>
        <img src="./about-company.png" alt="" className="mt-4" />
      </div>
      <div className="w-full md:w-1/2 px-4 py-10 md:px-16">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Provide Company <br />
            background and team info
          </h1>
          <p className="text-slate-500 mt-6 text-lg md:text-xl text-justify tracking-wide">
            Over the past 6 years we cleaned over 34,000 cars, saved over 8.9
            million liters of water from being used in car washing and employed
            50 youth. Our legacy is in the youth that gained work and life
            skills, grew their confidence and have moved on to bigger.
          </p>
          <div className="mt-4">
            <div className="flex items-center">
              <img src="./tick.png" alt="" />
              <span className="px-4 text-lg md:text-xl text-slate-500 tracking-wide">
                Over 250,000 cleans
              </span>
            </div>
            <div className="flex items-center mt-6">
              <img src="./tick.png" alt="" />
              <span className="px-4 text-lg md:text-xl text-slate-500 tracking-wide">
                VIP & Annual Pass Programs
              </span>
            </div>
            <div className="flex items-center mt-6">
              <img src="./tick.png" alt="" />
              <span className="px-4 text-lg md:text-xl text-slate-500 tracking-wide">
                100% Satisfaction
              </span>
            </div>
            <div className="flex items-center mt-6">
              <img src="./tick.png" alt="" />
              <span className="px-4 text-lg md:text-xl text-slate-500 tracking-wide">
                Flexible and Cost-Effective
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
