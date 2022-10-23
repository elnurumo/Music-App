import React from 'react'


function Header({ LibraryButton }) {
  return (
    <div className='header_area'>
      <h1 className="header_name">Waves</h1>
      {LibraryButton}
    </div>
  )
}

export default Header