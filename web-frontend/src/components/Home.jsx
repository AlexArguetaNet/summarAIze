import React from 'react'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { fetchSummary } from '@/api/summary'
import { Spinner } from "../components/ui/spinner"
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import { MdErrorOutline } from "react-icons/md";

function Home() {

  const [isParagraph, setIsParagraph] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [summaryStr, setSummaryStr] = useState("");
  const [summaryArr, setSummaryArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [errorExists, setErrorExists] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function handleTextSwitch(clickedParaTab) {
    if (!clickedParaTab && isParagraph) setIsParagraph(false);
    if (clickedParaTab && !isParagraph) setIsParagraph(true);

    setTextInput("");
  }

  function handleClear() {
    setTextInput("");
    setSummaryArr([]);
    setSummaryStr("");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(summaryStr);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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

    <div className="bg-(--glass-bg-light) backdrop-blur-xl border border-(--glass-border-light) rounded-xl h-fit mx-auto w-[70%] max-w-[900px] flex justify-center">
      <div className='w-full m-5'>

        <div className='flex justify-end'>
          <Tabs defaultValue="paragraph" className="">
            <TabsList variant='line'>
              <TabsTrigger onClick={() => handleTextSwitch(true)} value="paragraph">Paragraph</TabsTrigger>
              <TabsTrigger onClick={() => handleTextSwitch(false)} value="url">Url</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {
          errorExists &&
            <Alert variant="destructive" className="mt-4 bg-red-300/50">
              <MdErrorOutline className="text-red-800!" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-black!">{errorDescription}</AlertDescription>
              <AlertAction>
                <Button onClick={() => setErrorExists(false)} size="xs" className="bg-red-800">
                  X
                </Button>
              </AlertAction>              
            </Alert>
        }

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='h-fit'>
            {
              isParagraph ? <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-lg! placeholder:text-black! mt-5 h-75 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your text here ..." required />
                          : <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="bg-textarea-bg text-black! text-lg! placeholder:text-black! mt-5 resize-none border border-white/50 focus-visible:border-[#ffffff] focus-visible:ring-0" placeholder="Enter your url here ..." required />              
            }
            <div className='flex justify-between items-center my-10'>
              <Button type="submit" size="lg" variant="outline" disabled={disableButton} className="bg-green-200/50 hover:bg-green-500/50" >Submit</Button>
              { isParagraph ? <p>Characters | {textInput.replace(/ /g, "").length}</p> : <div className='w-29'></div> }
            </div>
          </div>
        </form>

        <div className='flex justify-center text-lg'>
          <div>
            { isLoading && <Spinner className="size-7" />}
            {
              summaryArr.length > 0 &&
                <div>
                  <ul className='space-y-10'>
                    {
                      summaryArr.map((elem, index) => (
                        <li key={index}>&#8226; {elem}</li>
                      ))
                    }
                  </ul>
                  <div className='flex justify-center mt-10'>
                    <Button onClick={handleCopy} className={`w-50 transition-all duration-300 ${ isCopied ? "bg-green-200 hover:bg-green-200 text-black shadow-lg" : ""}`}>
                      { isCopied ? "Copied" : "Copy" }
                      <MdContentCopy />
                    </Button>
                    <Button className="w-50" onClick={handleClear} >Clear <MdDeleteOutline /></Button>
                  </div>
                </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
