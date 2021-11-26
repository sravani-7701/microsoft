import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
function Header() {
    return (
        <div className="hdr">
            <h3>MicrosoftClassrooms</h3>
            <div className="dropdown">
            <FontAwesomeIcon className="lgo" cursor="pointer" icon={faUserAlt} size="2x"/>
              <div className="dropdown-content drop">
                 <p>Student</p>
                 <p>Teacher</p>
              </div>
           </div>
        </div>
    )
}

export default Header
