import React, { useState } from 'react'
import Navbar from './Navbar'
import Section from './Section'

const EmptyVideoPage = () => {
    const [HideAside, setHideAside] = useState(true)

  return (
    <main className="min-h-[100vh] w-full bg-[#121212]">
    <Navbar HideAside={HideAside} setHideAside={setHideAside} />
    <Section HideAside={HideAside} setHideAside={setHideAside} />
  </main>

  )
}

export default EmptyVideoPage