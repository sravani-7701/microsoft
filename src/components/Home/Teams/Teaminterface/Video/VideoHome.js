// this page will appear only to team admin
import React ,{useState,useEffect}from 'react'
import { useParams } from "react-router-dom";
import {useHistory} from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; 
import "./Video.css"
import { v4 as uuidv4 } from 'uuid'; 
var Loader = require('react-loader');
function VideoHome (){
    const{id,isAdmin}=useParams();
    const[loader,setloader]=useState(true);
    let history=useHistory();
    const join= async()=>{
        try{
        setloader(false);
        const url=`/calls/${uuidv4()}`;
        const res=await fetch(`/calls/${id}`,{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
              url
            })       
        });
        const data=await res.json();

        history.push(url);
    }
    catch(err){
        setloader(true);
        console.log(err);
    }
    }
    return (
        <div>
            <Loader loaded={loader}/>
              <button className="videobutton" onClick={join}> Host a meeting</button>
        </div>
    )
    
}

export default VideoHome
