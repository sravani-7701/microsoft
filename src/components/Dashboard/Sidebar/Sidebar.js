import React from 'react'
import './Sidebar.css'
function Sidebar({state,setstate}) {
    const fun=(e)=>{
     e.preventDefault();
     const list=[...document.getElementsByTagName("li")];
     list.forEach(l=>{
         l.classList.remove("active");
     })
     e.target.classList.add("active");
     setstate(e.target.value);
    }
    return (
        <div>
            <div className="container sid">
               <nav className="side-nav">
                  <ul className="nav-menu">
                    <li className="nav-item" onClick={fun} value="0">Activity</li>
                    <li className="nav-item" onClick={fun} value="1">Teams</li>
                    <li  className="nav-item" onClick={fun} value="2">Assignments</li>
                    <li className="nav-item" onClick={fun} value="3">Calls</li>
                    <li className="nav-item" onClick={fun} value="4">Chats</li>
                   </ul>
               </nav>
            </div>
        </div>
    )
}

export default Sidebar
