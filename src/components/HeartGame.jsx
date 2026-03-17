import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function HeartGame({ next }) {

const [count, setCount] = useState(0)
const [hearts, setHearts] = useState([])
const [showGift, setShowGift] = useState(false)
const [pos, setPos] = useState({ top: 50, left: 50 })

// ⏱ เวลา
const [time, setTime] = useState(60)

// 🎯 ขนาดปุ่ม
const [size, setSize] = useState(80)

// 📱 เช็คมือถือ
const isMobile = window.innerWidth < 768

// 😈 cooldown กันหนีรัว
const [canEscape, setCanEscape] = useState(true)

// ⏱ นับถอยหลัง (แก้ไม่ให้บัค)
useEffect(() => {
if(time <= 0){
alert("หมดเวลาแล้ว 😭 ลองใหม่อีกครั้งนะ")
setCount(0)
setTime(60)
setSize(80)
return
}

const timer = setTimeout(() => {
setTime(t => t - 1)
}, 1000)

return () => clearTimeout(timer)
}, [time])

// 📍 สุ่มตำแหน่ง
function randomPos(){
const top = 20 + Math.random() * 60
const left = 20 + Math.random() * 60
setPos({ top, left })
}

// 😈 หนีแบบมีคูลดาวน์
function escape(){
if(!canEscape) return

setCanEscape(false)
randomPos()

setTimeout(() => {
setCanEscape(true)
}, 500) // หนีได้ทุก 0.5 วิ
}

function handleClick(){

const newCount = count + 1
setCount(newCount)

// 💖 หัวใจลอย
const burst = Array.from({ length: 3 }).map(() => ({
id: Date.now() + Math.random(),
x: Math.random() * 100,
rotate: Math.random() * 60 - 30
}))
setHearts(prev => [...prev, ...burst])

// 🎯 ยากขึ้น (แต่ไม่โหดเกิน)
if(newCount % 3 === 0){
setSize(s => Math.max(isMobile ? 60 : 45, s - 8))
}

// 📍 ย้ายตำแหน่ง
randomPos()

// 🎁 ครบ
if(newCount >= 10){
setShowGift(true)
setTimeout(() => {
next(true)
}, 4000)
}
}

return (
<div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4">

<h2 className="text-2xl text-pink-500 mb-2">
💖 เกมจับหัวใจให้ทัน!
</h2>

<p className="text-gray-500 text-sm mb-2">
ไม่ยาก ลองดู 😏
</p>

<p className="text-red-400 mb-2">
⏱ เหลือเวลา: {time} วินาที
</p>

{/* ❤️ ปุ่ม */}
<motion.button
onClick={handleClick}
onMouseEnter={escape}
onTouchStart={() => {
setTimeout(() => escape(), 150) // หน่วงสำหรับมือถือ
}}
className="absolute"
style={{
top: `${pos.top}%`,
left: `${pos.left}%`,
transform: "translate(-50%, -50%)",
fontSize: `${isMobile ? size + 20 : size}px`
}}
animate={{ scale: [1, 1.15, 1] }}
transition={{ duration: 0.2 }}
>
❤️
</motion.button>

<p className="mt-4 text-gray-500">
{count} / 10
</p>

{/* 💓 หัวใจลอย */}
<AnimatePresence>
{hearts.map(h => (
<motion.div
key={h.id}
initial={{ y: 0, opacity: 1 }}
animate={{
y: -200,
opacity: 0,
x: (Math.random() - 0.5) * 100,
scale: [1, 1.5, 1]
}}
transition={{ duration: 1 }}
className="absolute text-xl"
style={{
left: `${h.x}%`,
transform: `rotate(${h.rotate}deg)`
}}
>
💖
</motion.div>
))}
</AnimatePresence>

{/* 🎁 กล่อง */}
{showGift && (
<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1 }}
className="mt-6 text-4xl animate-bounce"
>
🎁
<p className="text-lg text-pink-500 mt-2">
เก่งมาก กำลังเปิดสิ่งที่พิเศษ🫣
</p>
</motion.div>
)}

</div>
)
}

export default HeartGame