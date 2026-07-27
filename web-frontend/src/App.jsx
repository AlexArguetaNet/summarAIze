import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import { useState } from "react"
import { GiSamuraiHelmet } from "react-icons/gi"

function App() {

  const [text, setText] = useState("");

  return (
    <>
      <div className="mx-auto mt-7 max-w-[700px] p-4 bg-gray-50 shadow-md">
        <h1 className="flex align-middle text-4xl pb-5">Summarai <GiSamuraiHelmet /></h1>

        <Textarea 
          className="h-72 resize-none text-xl" 
          placeholder="Enter your text here" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between py-5">
          <Button>Summarize</Button>
          <p>Character count | {text.length}</p>
        </div>

      </div>
    </>
  )
}

export default App
