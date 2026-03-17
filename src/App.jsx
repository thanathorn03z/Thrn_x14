import { useState } from "react"
import Game from "./components/Game"
import HeartGame from "./components/HeartGame"
import Hero from "./components/Hero"
import Wish from "./components/Wish"
import Footer from "./components/Footer"

function App(){

const [step,setStep] = useState(1)

return(
<div className="w-screen h-screen overflow-hidden">

  {/* 💖 เกมหัวใจ */}
  {step === 1 && <HeartGame next={() => setStep(2)} />}

  {/* 🎮 เกมจับคู่ */}
  {step === 2 && <Game unlock={() => setStep(3)} />}

  {/* 🎂 หน้าเซอร์ไพรส์ */}
  {step === 3 && <Hero />}
  {step === 3 && <Wish />}

  <Footer/>

</div>
)

}

export default App