import React,{useEffect,useState,useContext} from 'react'
import Activityname from './Activityname'
import {UserDetails} from '../Home/Home'
function Activity() {
    const[activity,setactivity]=useState([]);
    // using context hook retrieving UserDetails from home page
     var user=useContext(UserDetails);
     //whenever page refreshes user activity will be refreshed 
     useEffect(()=>{
        if(user&&user.Activity){
            setactivity(user.Activity);
        }   
     },[user])
    return (
        <div>
            {activity.map( (a, index)=>{
                return(
                   <div className="cdesign" key={index}>
                       <Activityname type={a.activityType} name={a.teamName}/>
                  </div>
                  )
                })
            }
        </div>
    )
}
export default Activity;
