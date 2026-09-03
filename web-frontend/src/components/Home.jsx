import React from 'react'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

function Home() {

  const [usingUrl, setUsingUrl] = useState(true);
  const [textInput, setTextInput] = useState("");

  function handleTextSwitch() {
    if (usingUrl) {
      setUsingUrl(false);
    } else {
      setUsingUrl(true);
    }

    setTextInput("");
  }

  return (

    <div className="bg-(--glass-bg-light) backdrop-blur-xl border border-(--glass-border-light) rounded-4xl h-[500px] mx-auto w-[70%] max-w-[900px] flex justify-center">
      <div className='w-full m-5'>

        <div className='flex justify-end'>
          <Tabs defaultValue="url" className="">
            <TabsList variant='line'>
              <TabsTrigger onClick={handleTextSwitch} value="url">Url</TabsTrigger>
              <TabsTrigger onClick={handleTextSwitch} value="paragraph">Paragraph</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='h-90'>
          {
            usingUrl ? <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-xl! placeholder:text-black! mt-5 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your url here ..." /> 
                      : <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-xl! placeholder:text-black! mt-5 h-75 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your text here ..." />
          }
        </div>

        <Button size="lg" variant="outline" className="bg-green-200/50 hover:bg-green-500/50" >Submit</Button>


      </div>



    </div>
  )
}

export default Home
