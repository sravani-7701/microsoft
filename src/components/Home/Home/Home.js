import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";  
import './Studenthome.css'
import Sidebar from '../Sidebar/Sidebar'
import Activity from "../Activity/Activity"
import Teams  from '../Teams/Teams';
import Teaminterface from "../Teams/Teaminterface/Teaminterface"
import Background from './Background';
import Answers from '../Teams/Teaminterface/Assignment/Answers'
import Submitanswers from '../Teams/Teaminterface/Assignment/Submitanswers'
import Todo from '../Todo/Todo'
const UserDetails= React.createContext({});//create contexthook to store userdetails
function Home() {
let history = useHistory();
const[user,setuser]=useState({});
const[loader,setloader]=useState(true);
const logout=()=>{
    //whenever we fetch a api from server loader is set to false
    setloader(false);
    //fetching logout api from server
    fetch("/logout",{
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials:"include"
    })
    .then((res)=>{
        history.push('/login',{replace:true});//redirecting to login page after logging out
    })
    .catch((err)=>{
        console.log(err);
    })
   setloader(true);
}
const callabout=async() =>{
     try{
         //this is done for authenticating as well as fetch user details. 
         setloader(false);
         const res= await fetch("/about",{
             method:"GET",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json"
             },
             credentials:"include"
         });
          const data=await res.json();
         if(!res.status===200){
             history.push('/login');//if user authentication fails then redirect to login page
         }
         if(!data){
             history.push('/login');//if user data is not found then redirects to login page
         }
         setuser(data);
         setloader(true)//after the function then loader is set back to true
     }
     catch(err){
         console.error(err);
         history.push("/login");
     }
}
    //whenever the page refreshes user details are updated and authentication will be rechecked
    useEffect(()=>{
        callabout();
    },[user])
    // used router for different routes
    return (
        <UserDetails.Provider value={user}>
            <div className="home">
            <div className="nave"> 
            <p>Microsoft Classrooms</p>
                <button  onClick={logout} className="btnlogout">Logout</button>
            </div>
            <div div className="homebody"> 
             <div className="sidebar">
                <Sidebar/>
             </div>
                <div className="mainpart">
                 <Switch> 
                     <Route exact path="/home">
                         <Background/>
                     </Route>
                     <Route exact path="/home/activity"> 
                          <Activity/>
                     </Route>
                     <Route exact path="/home/teams">
                     <Teams/>
                     </Route>
                     <Route exact path="/home/teams/:id/:isAdmin">
                         <Teaminterface/>
                     </Route>
                     <Route exact path="/home/teams/:id/:isAdmin/:filename">
                         <Answers/>
                     </Route>
                     <Route exact path="/home/teams/:id/:isAdmin/:filename/:userid">
                         <Submitanswers/>
                     </Route>
                     <Route exact path="/home/todo">
                         <Todo/>
                     </Route>
                     <Route exact path="/home/activity">
                         <Activity/>
                     </Route>
                 </Switch>
                 </div>
            </div>
        </div>
        </UserDetails.Provider>
    )                   
}
export default Home
export {UserDetails}