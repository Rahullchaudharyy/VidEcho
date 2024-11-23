import React from "react";

const Video = () => {
  return (
    <main
      className={`xs:w-[80%] pt-[80px] h-full w-[100%] grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 bg-gray-500 overflow-y-scroll`}
    >
      <div id="Video-Div" className=" flex flex-col gap-3 h-auto col-span-2 ">
        <div
          id="Mian-Video"
          className="w-full h-[200px] md:h-[360px] rounded-md bg-red-600"
        ></div>
        <div
          id="Video-Details"
          className="w-full flex flex-col h-auto rounded-md bg-black p-3 gap-2"
          
        >

            <div id="All-Video-Details-Buttons" className="flex w-full flex-col sm:flex-row sm:justify-between gap-3">
                <div id="Title-Data-Views">
                    <h1 className="text-md text-white">React Concepts</h1>
                    <span className="text-[11px] flex text-white">
              100k Veiws • <h1>17 Hours Ago</h1>
            </span>           
                </div>
                <div id="Like-Save-Dislike" className="flex justify-between sm:justify-center sm:gap-4 sm:items-center">
               
               <div className="flex">
               <button className="border border-r-0 px-[5px] py-0 rounded-l-full text-white text-sm"><i class="ri-thumb-up-line"></i> Like</button>
               <button className="border border-l-1 px-[5px] py-0 rounded-r-full text-white text-sm"><i class="ri-thumb-down-line"></i> Dislike</button>

               </div>
                <button className="p-2 border flex px-[5px] py-0 items-center border-white rounded-full text-white"><i class="ri-play-list-add-fill"></i>Save</button>
                </div>
            </div>
            <div id="Channel" className=" flex justify-between items-center h-auto">
                <div className="flex items-center gap-2">
                    <div id="Icon" className="h-[30px] w-[30px] rounded-full bg-red-400">

                    </div>
                    <div id="name-count" className="text-white">
                        <h1 className="text-[15px]">Channel Name</h1>
                        <p className="text-sm">230k Subscriber</p>
                    </div>
                </div>
                <div className="ButtonSubscribe">
                    <button className="text-white border p-1 rounded-full">Subscribe</button>
                </div>
            </div>
            <hr className="pt-2" />
            <div id="Description" className="h-auto">
                <h2 className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At reiciendis corporis facilis consequuntur eaque, necessitatibus veniam aspernatur similique mollitia aliquid aperiam debitis quia quis accusamus neque praesentium. Error aspernatur molestiae laboriosam, earum odit cum.
                </h2>
            </div>
        </div>

        <div
          id="Video-Comments"
          className="w-full h-[60px] rounded-md bg-yellow-300"
        ></div>
      </div>

      <suggestions
        id="Video-suggestions-Div"
        className="flex flex-col  justify-center items-center gap-1"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="h-[100px] sm:h-[100px] lg:h-[150px] w-full rounded-xl bg-black"
          ></div>
        ))}
      </suggestions>
    </main>
  );
};

export default Video;
