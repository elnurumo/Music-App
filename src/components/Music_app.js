import React, { useState, useRef } from 'react'
import Header from "./Header/Header";
// import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import { data } from "./Main/data"

function Music_app() {
  const audioRef = useRef(null)
  const [activeLibrary, setActiveLibrary] = useState(false)
  const [count, setCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [Music, setMusic] = useState(data[count])




  function sidebarHandler() {

    if (!activeLibrary) {
      setActiveLibrary(true)
    } else {
      setActiveLibrary(false)
    }
  }

  function selectMusicHandler(item) {

    if (!activeLibrary) {
      setActiveLibrary(true)
    } else {
      setActiveLibrary(false)
    }
    setIsPlaying(true)
    setMusic(item)
  }


  const Sidebars = activeLibrary ? "sidebar_show_area" : "sidebar_area"

  const LibraryButton = <button onClick={sidebarHandler} className="library_button">Library<i className="fa-solid fa-music"></i></button>

  return (
    <div className="section_area">
      <div className='musics_areas'>
        <Header LibraryButton={LibraryButton} />
        <Main data={data} setDuration={setDuration} duration={duration} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} Music={Music} setMusic={setMusic} setCount={setCount} count={count} />
      </div>
      <div className={`sidebar_area ${Sidebars}`} >
        <div className="sidebar_name_exit_area">
          <h1 className='sidebar_name'>Library</h1>
          <i onClick={sidebarHandler} class="fa-solid fa-xmark close"></i>
        </div>
        {data?.map((item) => (
          <div key={item?.id} onClick={() => {selectMusicHandler(item)
            
          }} className="music_area">
            <img src={item?.cover} alt="Music img" className="music_library_img" />
            <div className="music_library_name_artist_area">
              <h2 className="music_library_name">{item?.name}</h2>
              <p className="music_library_artist">{item?.artist}</p>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Music_app