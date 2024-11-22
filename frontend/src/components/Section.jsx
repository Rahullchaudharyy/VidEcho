import React, { useState } from "react";

const Section = ({ HideAside, setHideAside }) => {
  return (
    <section className="h-screen flex-col-reverse flex xs:flex-row w-full relative">
      <aside className="w-full focus:w-[40%] fixed bottom-0 z-20 xs:relative xs:w-[20%] xs:flex xs:flex-col bg-[#121212] h-[70px] xs:h-full">
        <div className="w-full h-full flex xs:flex-col justify-between xs:justify-start xs:mt-16 xs:gap-4 xs:items-start items-center p-4 ">
            <button className="text-white xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-home-6-line text-[6vmin] xs:text-xl"></i>
                Home</button>
            <button className="text-white xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-history-line text-[6vmin] xs:text-xl"></i>
                Histoty</button>
            <button className="text-white xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-folder-2-line text-[6vmin] xs:text-xl"></i>
                Collections</button>
            <button className="text-white xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>
                Subscribers</button>
            <button className="text-white hidden xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start xs:flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>
                Liked Video</button>
            <button className="text-white hidden xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start xs:flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>
                My Conetent</button>
        </div>
        <div className="p-2 flex flex-col gap-3">
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Sign In
            </button>
            <button className="text-white bg-slate-500 text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Sign Up
            </button>
          </div>
      </aside>

      <main className="xs:w-[80%] h-full w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-gray-500 overflow-y-scroll">
  {Array.from({ length: 24 }).map((_, index) => (
    <div
      key={index}
      className="h-[150px] sm:h-[200px] lg:h-[250px] w-full rounded-xl bg-black"
    ></div>
  ))}
</main>



      <aside
        className={`w-[250px] absolute  right-0 z-[99] transform transition-all duration-300 ease-in-out${
          HideAside
            ? "translate-x-full opacity-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        } border-l border-white   bg-[#121212] md:hidden h-screen `}
      >
   
        <div className="h-[70px] border-b border-white text-white flex justify-between items-center p-4">
          <h1 className="text-md">Logo</h1>
          <h1 onClick={() => setHideAside(!HideAside)}>
            <i class="ri-close-circle-line text-xl"></i>
          </h1>
        </div>

        <div className="w-full h-[80%] justify-between flex  flex-col ">
          <div className="p-2 flex flex-col gap-3">
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Like Videos
            </button>
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              My Conetent
            </button>
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Support
            </button>
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Setting
            </button>
          </div>
          <div className="p-2 flex flex-col gap-3">
            <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Sign In
            </button>
            <button className="text-white bg-slate-500 text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
              Sign Up
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Section;
