import { useEffect, useRef } from "react";

function Music({ open }) {

const audioRef = useRef(null);

useEffect(() => {

if (audioRef.current) {

if (open) {

audioRef.current.src = "/music/love.mp3";

} else {

audioRef.current.src = "/music/birthday.mp3";

}

audioRef.current.play();

}

}, [open]);

return <audio ref={audioRef} loop />;

}

export default Music;
{/*import React, { useState } from 'react';
function Music() {
    const [playing, setPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const tracks = [
        '/music/testsong.mp3'
    ];
    return (
        <>
            <h1 className="text-3xl text-blue-400 font-semibold">ฟังเพลงก่อนนะ 🎧</h1>
            <div className="flex justify-center items-center w-full">
            </div>
            <div className="w-80 mx-auto p-4 backdrop-blur-xl bg-white/30 shadow-lg rounded-lg text-center my-5">
                <p className='text-lg font-semibold'>ชื่อเพลง </p>
                <p className='text-xs my-1'>ชื่อศิลปิน</p>
                <audio
                    src={tracks[trackIndex]}
                    controls
                    autoPlay={playing}
                    className="w-full"
                />
                <p className="mt-2 text-gray-700">{`Now playing: Track ${trackIndex + 1}`}</p>
            </div>
        </>
    );
}

export default Music;*/}