import React, { useRef, useState, useEffect } from 'react'
// import data from "./data"

function Main({ Music, setMusic, data, isPlaying, setIsPlaying, audioRef, duration, setDuration, count}) {
    const inputRange = useRef(null)
    const inputMusic = useRef(null)
    const [isVolume, setIsVolume] = useState(50)
    const [isMute, setIsMute] = useState()
    const [elapsed, setElapsed] = useState(0)

    function musicHandler(e) {
        audioRef.current.currentTime = e.target.value
    }

    function changeMusicHandlerBack() {
        audioRef.current.currentTime -= 10
    }

    function changeMusicHandler() {
        audioRef.current.currentTime += 10
    }



    useEffect(() => {

        setInterval(() => {
            if (isPlaying) {
                const _elapsed = Math.floor(audioRef.current.currentTime)
                const _duration = Math.floor(audioRef.current.duration)

                setDuration(_duration)
                setElapsed(_elapsed);
            }
        }, 100);

    }, [isPlaying, elapsed === duration])


    function musicControllerHandler(time) {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }

        return '00:00';
    }

    function volumeHandler(e) {
        setIsVolume(e.target.value)
        audioRef.current.volume = e.target.value / 100
        if (audioRef.current.volume == 0) {
            setIsMute(true)
        }
        if (audioRef.current.volume > 0) {
            setIsMute(false)
        }
    }

    function volumeMute() {
        if (audioRef.current.volume > 0) {
            audioRef.current.volume = 0
            inputRange.current.value = 0
            setIsMute(true)
        }
        else if (audioRef.current.volume === 0) {
            audioRef.current.volume = isVolume / 100
            inputRange.current.value = isVolume
            setIsMute(false)
        }
    }

    function playHandler() {
        if (isPlaying) {
            audioRef.current.pause()
        }
        else {
            audioRef.current.play()
        }
    }

    const playButton = isPlaying ? <i onClick={playHandler} className="fa-solid fa-pause"></i> :
        <i onClick={playHandler} className="fa-solid fa-play"></i>

    const volume = isMute || isVolume === 0 ? <i onClick={volumeMute} className="fa-solid fa-volume-xmark volume"></i> :
        <i onClick={volumeMute} className="fa-solid fa-volume-low volume"></i>

    return (
        <div className='main_area'>
            <img src={Music.cover} alt="Music Photo" className="music_image" />
            <h1 className="name">{Music.name}</h1>
            <p className="artist_name">{Music.artist}</p>
            <div className='music_move'>
                <audio autoPlay muted={() => setIsVolume(true)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} ref={audioRef} className='music' src={Music.audio}></audio>

                <div className="music_controller_handler">
                    <h3 className="time_start">{musicControllerHandler(elapsed)}</h3>
                    <input
                        max={duration}
                        ref={inputMusic}
                        type="range"
                        value={elapsed}
                        onChange={musicHandler}
                        className='music_input'

                    />
                    <h3 className="time_finish">{musicControllerHandler(duration - elapsed)}</h3>
                </div>
            </div>
            <div className="control_area">
                <i className="fa-solid fa-chevron-left" onClick={changeMusicHandlerBack}></i>
                {playButton}
                <i className="fa-solid fa-chevron-right" onClick={changeMusicHandler}></i>
                <div className="volume_area">
                    {volume}
                    <input max={100} className='volume_change' ref={inputRange} type="range" onChange={volumeHandler} />
                </div>
            </div>
        </div>
    )
}

export default Main