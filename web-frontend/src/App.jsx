import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import { Spinner } from "./components/ui/spinner"
import { useState } from "react"
import { GiSamuraiHelmet } from "react-icons/gi"
import { fetchSummary } from "./api/summary"

function App() {

  const [text, setText] = useState("");
  const [summaryArr, setSummaryArr] = useState([]);
  const [summaryStr, setSummaryStr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = async () => {

    setIsLoading(true);
    try {
      const summary = await fetchSummary(text);
      console.log(summary);
      setSummaryArr(summary.summaryArray);
      setSummaryStr(summary.summaryString);

    } catch (error) {
      alert("An error occurred");
    }

    setIsLoading(false);

  }

  const handleClear = () => {
    setSummaryArr("");
    setText("");
    isCopied(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryStr);
    setIsCopied(true);
  }

  return (
    <>
      <div className="mx-auto my-7 max-w-[700px] p-4 bg-gray-50 shadow-md">
        <h1 className="flex align-middle text-4xl pb-5">Summarai <GiSamuraiHelmet /></h1>

        <Textarea 
          className="h-72 resize-none text-xl" 
          placeholder="Enter your text here" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between py-5">
          <Button onClick={handleClick} >Summarize</Button>
          <p>Character count | {text.length}</p>
        </div>

        <div className="flex justify-center">
          {
            isLoading && <Spinner className="size-7" />
          }
          {
            summaryArr.length > 0 && 
              <div className="">
                <div className="px-10">
                  {
                    summaryArr.map((elem, index) => (
                      <li key={index}>{elem}</li>
                    ))
                  }
                </div>
                <div className="flex justify-end mt-5">
                  
                  {isCopied && <p>Copied!</p>}
                  <Button onClick={handleCopy}>Copy</Button>
                  <Button onClick={handleClear}>Clear</Button>
                </div>
              </div>
          }
        </div>

      </div>
    </>
  )
}

export default App
