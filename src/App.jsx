import { useState } from "react"
import Game from "./components/Game"
import HeartGame from "./components/HeartGame"
import Hero from "./components/Hero"
import Wish from "./components/Wish"
import Footer from "./components/Footer"
import Music from "./components/Music"

function App(){

  const [step,setStep] = useState(1)
  const [startMusic, setStartMusic] = useState(false)

  return(
    <div className="w-full min-h-screen">

      {/* 🔘 ปุ่มเริ่ม (กัน autoplay โดนบล็อก) */}
      {!startMusic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <button
            onClick={() => setStartMusic(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-xl shadow-lg"
          >
            ▶️ เริ่ม
          </button>
        </div>
      )}

      {/* 🎵 เล่นเฉพาะหน้าเกม + หลังจากกดเริ่ม */}
      {startMusic && (step === 1 || step === 2) && (
        <Music game={true} />
      )}

      {step === 1 && <HeartGame next={() => setStep(2)} />}
      {step === 2 && <Game unlock={() => setStep(3)} />}
      {step === 3 && <Hero />}
      {step === 3 && <Wish />}
      <Footer/>

    </div>
  )
}

export default App