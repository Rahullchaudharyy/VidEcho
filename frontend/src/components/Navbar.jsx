import React, { useState } from 'react'

const Navbar = ({HideAside,setHideAside}) => {
const [isLoggedin, setisLoggedin] = useState(true)
  return (
    <nav className='relative'>
 <div className='w-full h-[70px] z-50  bg-[#121212] fixed '>
        <ul className='h-full w-full flex justify-between px-5 items-center'>
            <li className='text-white'>
                <img className='h-[40px] w-[40px]' src="https://i.postimg.cc/wBRJrzkT/a-logo-for-a-stream-platform-with-a-playbutton-type-design-removebg-preview.png" alt="Logo" />
            </li>
            <div className='sm:flex items-center mx-4 sm:mx-0  md:min-w-[60vmin] md:max-w-[45%] w-[80%]   relative'>
            <input placeholder='Search' className='text-white focus:outline-blue-500 pl-6 border-none w-full flex justify-center items-center p-[0.4rem] bg-zinc-900 rounded-full'/>
            <li className='text-white bg-zinc-700 p-[0.4rem] hidden xs:block text-center rounded-r-full absolute right-0 top-0 text-md    '>Search</li>
            </div>
            <li onClick={()=>setHideAside(!HideAside)} className='text-white'><i class="ri-menu-2-line md:hidden"></i>
            {isLoggedin?
            // <div className='h-[40px] w-[40px] rounded-full bg-yellow-300'></div>
            ""
            :<button className='bg-zinc-800 p-1 rounded-full text-center hidden md:block px-3'>Sign In</button>}
            </li>
        </ul>
    </div>
    </nav>
   
  )
}

export default Navbar