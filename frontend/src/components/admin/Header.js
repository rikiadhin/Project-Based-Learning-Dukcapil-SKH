import React from 'react'
import "../../styles/Header.css"
// import "../styles/Dashboard.css"

const Header = ({nama}) => {
  return (
    
          <div class="box has-background-white has-box-shadow" id='Header'>
              <h1 class="title is-4 has-text-dark">{nama}</h1>
          </div>

  )
}

export default Header