import React, { useState } from "react";
import MainComp from "./MainComp";
import Video from "./Video";

const Section = ({ HideAside, setHideAside }) => {
  const [Collaps, setCollaps] = useState(true);
  const [ListLayout, setListLayout] = useState(false);


  return (
    <section className="h-screen flex-col-reverse flex xs:flex-row w-full relative">
      <aside
        className={`w-full bg-[#121212] h-[70px] fixed bottom-0 z-20 xs:relative xs:flex xs:flex-col  sm:w-[20%] xs:w-[20%]  xs:h-full`}
      >
        <div className="w-full h-full flex xs:flex-col justify-between xs:justify-start xs:mt-16 xs:gap-4 xs:items-start items-center p-4 ">
          <button className="text-white  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-home-6-line text-[6vmin] xs:text-xl"></i>

            <p id="Bottom-Para-button">Home</p>
          </button>
          <button className="text-white  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-history-line text-[6vmin] xs:text-xl"></i>

            <p id="Bottom-Para-button">Histoty</p>
          </button>
          <button className="text-white  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-folder-2-line text-[6vmin] xs:text-xl"></i>

            <p id="Bottom-Para-button">Collections</p>
          </button>
          <button className="text-white  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>

            <p id="Bottom-Para-button">Subscribers</p>
          </button>
          <button className="text-white hidden  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start xs:flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>

            <p id="Bottom-Para-button">Liked Video</p>
          </button>
          <button className="text-white  hidden  xs:flex-row gap-2 xs:border xs:p-2 xs:w-full xs:justify-start xs:flex flex-col justify-center items-center text-[4vmin] 1xs:text-[2vmin] xs:text-[1.7vmin]">
            <i class="ri-user-follow-line text-[6vmin] xs:text-xl"></i>
            <p id="Bottom-Para-button">My Conetent</p>
          </button>
        </div>
        <div className="p-2 flex flex-col gap-3">
          <button className="text-white text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
            Support
          </button>
          <button className="text-white bg-slate-500 text-start w-full border border-white p-2 hover:bg-white hover:border-black hover:text-black">
            Seettings
          </button>
        </div>
      </aside>

      {/* Main Componnent will be there */}
      <MainComp />
      {/* <Video/> */}
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
