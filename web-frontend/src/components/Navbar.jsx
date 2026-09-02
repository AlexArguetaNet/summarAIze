import React from 'react'
import { FaGithub } from "react-icons/fa"

function Navbar() {
  return (
    <div className='p-5 mb-20'>

        <div className='mx-auto flex justify-between w-[80%] max-w-[1100px] text-custom'>
            <h1 className='text-4xl'>SummarAIze</h1>
            <a href="https://github.com/AlexArguetaNet/summarAIze" className='flex items-center text-xl'>GitHub <FaGithub className='ml-2 text-2xl' /></a>
        </div>
      
    </div>
  )
}

export default Navbar
