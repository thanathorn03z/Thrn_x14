import React from "react";
import { motion } from "motion/react";
import Music from "./Music";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function Hero() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    // ✨ typing effect
    const [text, setText] = React.useState("");
    const [showCursor, setShowCursor] = React.useState(true);

    const message = `  อีกไม่กี่วันผมก็จะไปทหารแล้ว ผมขอใช้โอกาสนี้บอกตรง ๆ เลยนะครับว่า 
     ผมชอบนะครับ คือไม่ได้อยากกดดันอะไร หรือหวังให้คุณตอบกลับ 
     แค่อยากพูดให้ชัดเจน ขอบคุณที่ผ่านมาใจดีกับผม ดูแลตัวเองดี ๆ 
     ยิ้มเยอะ ๆ นะค้าบ ✌️🥰🐇`;
    // ⌨️ พิมพ์ทีละตัว
    React.useEffect(() => {

        if (open) {

            let i = 0;
            setText("");

            const typing = setInterval(() => {
                setText(prev => prev + message.charAt(i));
                i++;

                if (i >= message.length) {
                    clearInterval(typing);
                }
            }, 150);

            return () => clearInterval(typing);
        }

    }, [open]);

    // | cursor กระพริบ
    React.useEffect(() => {

        const cursor = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursor);

    }, []);

    return (
        <>
            <div className="text-center p-2">
                <div className="text-center bg-white rounded-xl shadow-xl mt-5 mx-3 lg:mx-20">

                    <Music open={open} />

                   <div className="relative flex justify-center items-center mt-5">

    {/* 🌈 พื้นหลังวงกลมฟุ้ง ๆ */}
    <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-50"></div>

{/* 🎈 ลูกโป่งลอย */}
{[...Array(6)].map((_, i) => (
    <motion.div
        key={"balloon-" + i}
        className="absolute text-3xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: -200, opacity: 1 }}
        transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8
        }}
        style={{
            left: `${10 + Math.random() * 80}%`
        }}
    >
        🎈
    </motion.div>
))}

                {/* 🎂 ชินจัง */}
                <div className="rounded-full bg-pink-100 flex items-center justify-center w-64 h-64 z-10 shadow-lg">
                    <motion.img
                        src="/picture/shinchan-cake.png"
                        className="w-56 h-56 object-contain"
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 3, -3, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* ✨ sparkle */}
                <motion.div
                    className="absolute text-yellow-300 text-2xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                    style={{ top: "10%", right: "20%" }}
                >
                    ✨
                </motion.div>

            </div>

                    <div className="p-10">
                        <h1 className="text-5xl font-semibold text-blue-400">
                            Happy Birthday
                        </h1>
                    </div>

                    {/* ปุ่มเปิด */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        <button
                            onClick={handleOpen}
                            className="text-4xl text-pink-300 hover:text-pink-500"
                        >
                            📸
                        </button>
                    </motion.div>

                </div>
            </div>

           <Dialog
    open={open}
    handler={handleOpen}
    
    backdropProps={{
        className: "bg-black/40 backdrop-blur-sm"
        
    }}
>

    <div className="relative overflow-hidden rounded-xl">

        {/* 💖 หัวใจลอย background */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-pink-300 text-lg"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: -120, opacity: 1 }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.4
                }}
                style={{
                    left: `${Math.random() * 100}%`
                }}
            >
                💖
            </motion.div>
        ))}

        {/* 💬 เนื้อหา */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-100 p-6">

            <DialogHeader className="text-blue-500 text-2xl justify-center">
                💌 มีบางอย่างอยากจะบอก
            </DialogHeader>

            <DialogBody className="text-lg text-gray-700 whitespace-pre-line leading-relaxed text-center bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md">

                {text}
                <span className="text-pink-400">
                    {showCursor && "|"}
                </span>

            </DialogBody>

            <DialogFooter className="justify-center">
                <Button
                    color="pink"
                    onClick={handleOpen}
                    className="rounded-full px-6 shadow-md"
                >
                    💖 รับรู้แล้ว
                </Button>
            </DialogFooter>

        </div>

    </div>

</Dialog>
        </>
    );
}

export default Hero;