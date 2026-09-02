import React from 'react'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Home() {

  const [usingUrl, setUsingUrl] = useState(true);

  return (

    <div className="bg-[var(--glass-bg-light)] backdrop-blur-xl border border-[var(--glass-border-light)] rounded-4xl h-[500px] mx-auto w-[70%] max-w-[900px] flex justify-center">
      <div className='w-full m-5'>

        <div className='flex justify-end'>
          <Tabs defaultValue="url" className="">
            <TabsList>
              <TabsTrigger onClick={() => setUsingUrl(true)} value="url">URL</TabsTrigger>
              <TabsTrigger onClick={() => setUsingUrl(false)} value="paragraph">Paragraph</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {
          usingUrl ? <Textarea className="text-white! text-xl! placeholder:text-white/70! mt-5 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your url here ..." /> 
                    : <Textarea className="text-white! text-xl! placeholder:text-white/70! mt-5 h-75 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your text here ..." />
        }

      </div>



    </div>
  )
}

export default Home
