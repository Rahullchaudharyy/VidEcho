import React, { useState } from 'react'

const MainComp = () => {
    const [ListLayout, setListLayout] = useState(false)
  return (
<>
        {ListLayout?<main className="xs:w-[80%] h-full pt-[80px] w-[100%] grid grid-cols-1 gap-5 p-5 bg-gray-500 overflow-y-scroll">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="h-[150px] sm:h-[200px] lg:h-[250px] w-full rounded-xl bg-black"
          ></div>
        ))}
      </main>:
      <main className={`xs:w-[80%] pt-[80px] h-full w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-gray-500 overflow-y-scroll`}>
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="h-[150px] sm:h-[200px] lg:h-[250px] w-full rounded-xl bg-black"
        ></div>
      ))}
    </main>}
</>
  )
}

export default MainComp