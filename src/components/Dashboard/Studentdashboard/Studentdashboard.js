import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../Header/Header'
import './StudentDashboard.css'
import Sidebar from '../Sidebar/Sidebar'
import Helper from '../Helper'
function Studentdashboard() {
 let history = useHistory();
 const[state,setstate] =useState(0);
 const[user,setuser]=useState({});
 const usertype="student";
 const callabout=async() =>{
     try{
         const res= await fetch(`/about/${usertype}`,{
             method:"GET",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json"
             },
             credentials:"include"
         });
         const data=await res.json();
         if(!res.status===200){
             const error=new Error(res.error);
             throw error;
         }
         setuser(data);
     }
     catch(err){
         console.error(err);
         history.push("/logins");
     }
 }
useEffect(()=>{
     callabout();
 },[callabout])
    return (
        <div className="totals">


            
        </div>
    )
                   
}

export default Studentdashboard
