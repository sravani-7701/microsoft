import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import image from './images.png'
import "./Teams.css"
import {UserDetails} from '../Home/Home' 
function Card({team,key}) {
    const[loader,setloader]=useState(true);
    const user=useContext(UserDetails);//fetching user details from home page using context api 
    let history = useHistory();
    const[teamdetails,setteamdetails]=useState({});//intialising tema details to empty object
   const getteam=async() =>{
        try{
        
            //fetch team details from server
            const res= await fetch(`/teamdetails/${team}`,{
                method:"GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            const data=await res.json();
            setteamdetails(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() =>{getteam()},[]);//after every refresh updates the team details
    const redirectsubject=(e)=>{
      let flag="0";
      if(teamdetails.AdminEmail===user.email){
          flag="1";                                    //sets the flag to 1 if user is admin of team
      }
      var string=teamdetails._id.toString();
      history.push(`/home/teams/${string}/${flag}`); //redirect to respective team interface
    }
    return (
        <div className="homepage-card-containeri" id="homepage-card-containeri">
            <div className="homepage-image-containeri" >
                <img src={image} alt='' />
              </div>
            <div className="homepage-card-contenti">
                <div className="homepage-card-titlei">
                    <h3 id="homepage-hi">{teamdetails.name}</h3>
                    <button className="btnca" onClick={e=>redirectsubject(e)}>
                    OPEN
                    </button>
                </div>
            </div>
        </div>
        
    )
}
export default React.memo(Card)
