import Navbar from "./components/Navbar"
import Summarizer from "./components/Summarizer"
import background from "./assets/bgb.jpg"

function App() {

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-10" style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <Summarizer />
    </div>
  )

}

export default App
