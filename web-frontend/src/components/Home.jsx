import React from 'react'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { fetchSummary } from '@/api/summary'
import { Spinner } from "../components/ui/spinner"

function Home() {

  const [isParagraph, setIsParagraph] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [summaryStr, setSummaryStr] = useState("");
  const [summaryArr, setSummaryArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [errorExists, setErrorExists] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");

  function handleTextSwitch(clickedParaTab) {
    if (!clickedParaTab && isParagraph) setIsParagraph(false);
    if (clickedParaTab && !isParagraph) setIsParagraph(true);

    setTextInput("");
  }

  async function handleSubmit(e) { 
    e.preventDefault();     // Prevent normal submit behavior
    setSummaryArr([]);      // Delete current summary
    setIsLoading(true);     // Enable loading spinner
    setDisableButton(true); // Disable submit button

    try {
      const summary = await fetchSummary(textInput);
      setSummaryArr(summary.summaryArray);
      setSummaryStr(summary.summaryString);
      setErrorExists(false)

      console.log(summaryArr);
    } catch (err) {
      setErrorExists(true);
      setErrorDescription(err.message);
      console.log(err.message);
    }

    setIsLoading(false);
    setDisableButton(false);

  }

  return (

    <div className="bg-(--glass-bg-light) backdrop-blur-xl border border-(--glass-border-light) rounded-4xl h-[500px] mx-auto w-[70%] max-w-[900px] flex justify-center">
      <div className='w-full m-5'>

        <div className='flex justify-end'>
          <Tabs defaultValue="paragraph" className="">
            <TabsList variant='line'>
              <TabsTrigger onClick={() => handleTextSwitch(true)} value="paragraph">Paragraph</TabsTrigger>
              <TabsTrigger onClick={() => handleTextSwitch(false)} value="url">Url</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='h-90'>
            {
              isParagraph ? <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-xl! placeholder:text-black! mt-5 h-75 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your text here ..." required />
                          : <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-xl! placeholder:text-black! mt-5 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your url here ..." required />              
            }
          </div>

          <div className='flex justify-between items-center text-lg'>
            <Button type="submit" size="lg" variant="outline" disabled={disableButton} className="bg-green-200/50 hover:bg-green-500/50" >Submit</Button>
            <div>
              { isLoading && <Spinner className="size-7" />}
              {
                summaryArr.length > 0 &&
                  <div>
                    {
                      summaryArr.map((elem, index) => (
                        <li key={index}>{elem}</li>
                      ))
                    }
                  </div>
              }
            </div>
            { isParagraph ? <p>Characters | {textInput.replace(/ /g, "").length}</p> : <div className='w-29'></div> }
          </div>
        </form>


      </div>
    </div>
  )
}

export default Home
