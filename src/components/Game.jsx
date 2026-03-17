import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

const images = [
"1.jpg",
"2.jpeg",
"3.jpeg",
"4.jpg"
]

function Game({ unlock }) {

const [cards, setCards] = useState([])
const [flipped, setFlipped] = useState([])
const [matched, setMatched] = useState([])
const [win, setWin] = useState(false)
const [moves, setMoves] = useState(0)
const [time, setTime] = useState(60)
const [hearts, setHearts] = useState([])

// 🔊 เสียง
const matchSound = new Audio("/sound/correct.mp3")

// 🎴 สุ่มการ์ดทุกครั้ง
useEffect(() => {
const shuffled = [...images, ...images].sort(() => Math.random() - 0.5)
setCards(shuffled)
}, [])

// ⏱ นับเวลา
useEffect(() => {
if (time <= 0 || win) return

const timer = setTimeout(() => {
setTime(t => t - 1)
}, 1000)

return () => clearTimeout(timer)
}, [time, win])

function handleClick(index) {

if (flipped.length === 2 || flipped.includes(index)) return

const newFlip = [...flipped, index]
setFlipped(newFlip)

if (newFlip.length === 2) {

setMoves(m => m + 1)

const first = cards[newFlip[0]]
const second = cards[newFlip[1]]

if (first === second) {

matchSound.play()

setMatched(prev => [...prev, first])

// 💖 หัวใจลอย
const burst = Array.from({ length: 4 }).map(() => ({
id: Date.now() + Math.random(),
x: Math.random() * 100
}))
setHearts(prev => [...prev, ...burst])

setTimeout(() => {
setFlipped([])
}, 500)

} else {

setTimeout(() => {
setFlipped([])
}, 800)

}

}

}

// 🎉 ชนะ
useEffect(() => {
if (matched.length === images.length) {
setWin(true)
confetti()

setTimeout(() => {
unlock(true)
}, 4000)
}
}, [matched])

return (

<div className="text-center p-6 relative overflow-hidden max-w-md mx-auto">

<h2 className="text-3xl mb-4 text-pink-400">
🎮 อีกนิดเดียว จับคู่รูปภาพก่อนนะค้าบ😜
</h2>

<p className="text-gray-500 mb-2">
⏱ เวลา: {time} | 🎯 ครั้งที่เปิด: {moves}
</p>

<div className="grid grid-cols-4 gap-4 max-w-md mx-auto">

{cards.map((img, index) => {

const show =
flipped.includes(index) ||
matched.includes(img)

return (

<motion.div
key={index}
onClick={() => handleClick(index)}
className="h-24 cursor-pointer"
whileTap={{ scale: 0.9 }}
>

<motion.div
animate={{ rotateY: show ? 0 : 180 }}
transition={{ duration: 0.4 }}
className="w-full h-full"
>

{show ? (
<img
src={`/game/${img}`}
className="w-full h-full object-cover rounded-lg"
/>
) : (
<div className="bg-pink-200 w-full h-full rounded-lg flex items-center justify-center text-2xl">
🎁
</div>
)}

</motion.div>

</motion.div>

)

})}

</div>

{/* 💖 หัวใจลอย */}
<AnimatePresence>
{hearts.map(h => (
<motion.div
key={h.id}
initial={{ y: 0, opacity: 1 }}
animate={{
y: -150,
opacity: 0
}}
transition={{ duration: 1 }}
className="absolute text-xl"
style={{ left: `${h.x}%` }}
>
💖
</motion.div>
))}
</AnimatePresence>

{/* 🎉 ชนะ */}
{win && (
<div className="mt-6 text-4xl animate-bounce">
🎉💖🎉
<p className="text-xl mt-2 text-pink-500">
เกมจบแล้ว แต่ความหวังดีของผมยังไม่จบนะค้าบ
</p>
</div>
)}

{/* ❌ แพ้ */}
{time === 0 && !win && (
<div className="mt-6 text-xl text-red-400">
หมดเวลาแล้ว 😭 แต่ยังไปต่อได้นะ
</div>
)}

</div>

)

}

export default Game