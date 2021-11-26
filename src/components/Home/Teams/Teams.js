import React,{useState,useContext} from 'react'
import './Teams.css'
import Card from './Card'
import {UserDetails} from '../Home/Home'
var Loader = require('react-loader');
function Teams() {
    const user=useContext(UserDetails);//fetching user details from home page using user context hook
    const[teamname,setteamname]=useState("");
    const[loader,setloader]=useState(true);
    // this function will make the hidden form to display 
    const openform=(e)=>{
        e.preventDefault();
        document.querySelector(".createform").style.display="block";
    }
    //hide the form
    const cancelform=(e)=>{
        e.preventDefault();
        document.querySelector(".createform").style.display="none";
    }
    //craete new team
    const createteam=async(e)=>{
        try{
            setloader(false);
            e.preventDefault();
            const AdminEmail=user.email;
            const name=teamname;
            //fetching api from server
            const res=await fetch("/team",{
              method: "POST",
              headers:{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({
               name,AdminEmail
              })
            });
            if(res.status===200){
                alert("Team created succesfully");   //after recieving response reset the form and hide the form
                setloader(true);
                setteamname("");
                document.querySelector(".createform").style.display="none";
            }
            else{
                alert("error");
                setloader(true);
                setteamname("");
            }
          }
          catch(err){
              console.log(err);
          }
    }
    //if user is not part of any team this will display
    if(!user.teams||!user.teams.length){
        return(
            <div className="noteam">
                 <Loader loaded={loader}/>
                 <button className="btnt" onClick={openform}>+Create team</button>
                 <div className="createform">
                    <label className="">Team name</label>
                    <input className="inp" required value={teamname} onChange={(e)=>{setteamname(e.target.value)}}/>
                    <button className="btnc" onClick={createteam}>Submit</button>
                    <button className="btncf" onClick={cancelform}>Cancel</button>
                </div>
            </div>
        )
    }
    else{
       // if user is  part of some team/teams
        const teams=user.teams;
    return (
        <div>
            <div className="teamtotal">
                <Loader loaded={loader}/>
                <button className="btnt" onClick={openform}>+Create team</button>
                <div className="createform">
                    <label className="">Team name</label>
                    <input className="inp" required value={teamname} onChange={(e)=>{setteamname(e.target.value)}}/>
                    <button className="btnc" onClick={createteam}>Submit</button>
                    <button className="btncf" onClick={cancelform}>Cancel</button>
                </div>
                <div className="teambody">
                    {
                    teams.map((team,index)=>{
                                return (
                                <Card team={team} key={index}/>
                              );})
                    }
                </div>
            </div>
        </div>
    )
    }
}

export default Teams
