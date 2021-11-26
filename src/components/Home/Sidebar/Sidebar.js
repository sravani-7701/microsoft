import React from 'react'
import {useHistory} from 'react-router-dom'
import './Sidebar.css'
import { v4 as uuidv4 } from 'uuid'; 
function Sidebar() {
    let history = useHistory();
    const fun=(e)=>{
     e.preventDefault();
     const list=[...document.getElementsByTagName("li")];
     list.forEach(l=>{
         l.classList.remove("active"); //remove active class from all list elements
     })
     e.target.classList.add("active");// add active class to current list element
     //according to the value of target respected page will be rendered
     if(e.target.value=="1"){
       history.push("/home/teams");
     }
     else if(e.target.value=="5"){
         history.push("/home/todo");
     }
     else if(e.target.value=="4"){
         history.push(`/calls/${uuidv4()}`);
     }
     else if(e.target.value=="3"){
        history.push("/home/activity");
     }
    }
    return (
        <div>
            <div className="container sid">
               <nav className="side-nav">
                  <ul className="nav-menu">
                    <li className="nav-item " onClick={fun} value="1">Teams</li>
                    <li className="nav-item" onClick={fun} value="3">Activity</li>
                    <li className="nav-item" onClick={fun} value="4">Calls</li>
                    <li className="nav-item" onClick={fun} value="5"> Todo</li>
                   </ul>
               </nav>
            </div>
        </div>
    )
}

export default Sidebar
