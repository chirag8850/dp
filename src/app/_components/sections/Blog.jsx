import React from "react";

function Blog() {
  return (
    <div className="p-4 md:p-10 bg-white">
      <div className="mt-12">
        <div className="flex items-center justify-center mt-2">
          <div className="border-t border-2 border-yellow-500 w-16 mr-4"></div>
          <span className="text-customYellow text-md uppercase">
            Read Our Blog
          </span>
        </div>
        <div className="text-center text-2xl md:text-3xl font-bold mt-3 ml-6">
          Featured News & Insights
        </div>
        <div className="text-center text-black-200 mt-4 text-sm md:text-base">
          Book online. We’ll provide you with a trusted, excellent services most
          <br className="hidden md:block" /> accurate and fair-price service
          Estimate.
        </div>
      </div>
      <div>
        <div className="px-4 md:px-12">
          <div className="text-yellow-500 flex justify-end mr-4 md:mr-20 my-5">
            View all &gt;
          </div>
          <div className="flex flex-col md:flex-row mx-2 md:mx-5 justify-between mb-10">
            <div className="w-full md:w-1/3 px-4 md:px-10 mb-6 md:mb-0">
              <div>
                <img
                  src="./news1.png"
                  alt="News 1"
                  className="w-full h-auto rounded-lg"
                />
                <div>
                  <div className="flex items-center mt-2">
                    <img
                      src="./Date_today.png"
                      alt="Date"
                      className="h-4 w-4"
                    />
                    <span className="mt-1 ml-2 text-sm">June 2, 2024</span>
                  </div>
                  <div className="mt-2 text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, minus!
                  </div>
                  <div className="text-yellow-500 flex justify-end font-bold">
                    Read More &gt;
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 md:px-10 mb-6 md:mb-0">
              <div>
                <img
                  src="./news2.png"
                  alt="News 2"
                  className="w-full h-auto rounded-lg"
                />
                <div>
                  <div className="flex items-center mt-2">
                    <img
                      src="./Date_today.png"
                      alt="Date"
                      className="h-4 w-4"
                    />
                    <span className="mt-1 ml-2 text-sm">June 2, 2024</span>
                  </div>
                  <div className="mt-2 text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, minus!
                  </div>
                  <div className="text-yellow-500 flex justify-end font-bold">
                    Read More &gt;
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 md:px-10">
              <div>
                <img
                  src="./news3.png"
                  alt="News 3"
                  className="w-full h-auto rounded-lg"
                />
                <div>
                  <div className="flex items-center mt-2">
                    <img
                      src="./Date_today.png"
                      alt="Date"
                      className="h-4 w-4"
                    />
                    <span className="mt-1 ml-2 text-sm">June 2, 2024</span>
                  </div>
                  <div className="mt-2 text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, minus!
                  </div>
                  <div className="text-yellow-500 flex justify-end font-bold">
                    Read More &gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
