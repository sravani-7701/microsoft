import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import "./Teaminterface.css"
import Teambody from './Teambody'
import $ from 'jquery'; 
import {UserDetails} from "../../Home/Home"
import {BrowserRouter,Route,Redirect,Switch,Link,useParams} from 'react-router-dom';
function Teaminterface() {
    const [item,setitem] =useState("0");   
    let {id,isAdmin}=useParams(); 
    let history = useHistory();
    const user=useContext(UserDetails);
    let userid;
    if(user && user._id){
        userid=user._id;
    }
    const handleAssignment=(e)=>{
        setitem("0");
    }
    const handleFile=(e)=>{
        setitem("1");
    }
    const handleStudent=(e)=>{
        setitem("3");
    }
   const handlecall=(e)=>{
       setitem("4");
   }
   const handleDiscussion=(e)=>{
       history.push(`/discussion/${id}/${userid}/${user.name}`)
   }
    return (
            <div className="interface">
                < div className="navii">
              <div className="containeri">
                <ul className="nav-listi">
                  <li className="nav-itemi" onClick={handleAssignment}>Assignment</li>
                  <li className="nav-itemi" onClick={handleFile}>Files</li>
                  <li className="nav-itemi" onClick={handleDiscussion}> Discussions</li>
                  {isAdmin==="1"? <li className="nav-itemi" onClick={handlecall}>Call</li>:<></> /*if user is admin display it*/}
                  {isAdmin==="1"?<li className="nav-itemi" onClick={handleStudent}> Add student</li>:<></>/*if user is admin display it*/}
                </ul>
              </div>

            </div>
            

           <div className="jumbobody">
               <Teambody item={item}/>               
           </div>

        </div>
    )
}
export default React.memo(Teaminterface)