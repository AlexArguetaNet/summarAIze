import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import { Spinner } from "./components/ui/spinner"
import { useState } from "react"
import { fetchSummary } from "./api/summary"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import background from "./assets/bgb.jpg"

function App() {

  return (


    <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-10"
          style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <Home />
    </div>
  )

}

export default App
