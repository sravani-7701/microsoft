// this is student interface of assignment page
import React,{useState,useEffect,useContext} from 'react'
import { useParams,useHistory} from "react-router-dom";
import './Assignment.css'
import {UserDetails} from '../../../Home/Home'
var FileSaver = require('file-saver');
const axios = require('axios');
var Loader = require('react-loader');
function Studentassignment() {
    let history = useHistory(); 
    const[loader,setloader]=useState(true);
    const user=useContext(UserDetails);
    const[team,setteam]=useState({});
    let {id,isAdmin}=useParams();
    const uploadfile=(e)=>{ //student can upload the answer sheet
      var filename=e.currentTarget.getAttribute('value');
      var enddate=e.currentTarget.getAttribute('data-end')
      console.log(enddate);
      var et=new Date(enddate);
      var today=new Date(Date.now())
      console.log(et);
      console.log(today);
      if(et<today){
          alert("You cannot upload..Deadline is over"); //if deadline is completed one can't submit  assignment
      }
      else{
      const userid=user.name;
      history.push(`/home/teams/${id}/${isAdmin}/${filename}/${userid}`) //redirects the pge where one can submit the assignment 
      }
    }
    const handlefile=(e)=>{   //download the assignment paper that the teacher has given
        setloader(false);
        alert("downloading started");
        var filename=e.currentTarget.getAttribute('value');
        var originalname=e.currentTarget.getAttribute('data-ext');
        axios({
         method: "GET",
         url: `/file/${filename}`,
         responseType: "blob"
       })
         .then(response => {
             FileSaver.saveAs(response.data,`${originalname}`);
         })
         .then(() => {
           console.log("Completed");
         })
         setloader(true);
     }
    const getteam=async() =>{
        try{
            setloader(false);
            const res= await fetch(`/teamdetails/${id}`,{
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
            console.log(data);
            setteam(data);
            setloader(true);
        }
        catch(err){
            console.log(err);
            setloader(true);
        }
    }
    useEffect(()=>{getteam()},[]);// get the team details
    if(!team||!team.Assignments||!team.Assignments.length){   //if team does'nt have any assignments
        return( <></>)
     }
    else{ 
        var scheduledAssignments=[];
        for(var i=0;i<team.Assignments.length;i++){
           var st=new Date(team.Assignments[i].Scheduleddate); //filtering according to the scheduled date, if the scheduled date is earlier than the scheduled date
           //than current date the user will be provided those assignments only otherwise student can't see them
            var today=new Date(Date.now())
            if(today>=st){
                scheduledAssignments.push(team.Assignments[i]);
            }
        }
    return (
        <div>
            <Loader loaded={loader}/>
            {
                scheduledAssignments.map((assignment,index) =>{
                    var startYear=new Date(assignment.Scheduleddate).getFullYear(); //converting
                    var startMonth=new Date(assignment.Scheduleddate).getMonth()+1;// date,month,year
                    var startDate=new Date(assignment.Scheduleddate).getDate();   //of scheduled date and end date 
                    var startHour=new Date(assignment.Scheduleddate).getHours();  //to local time
                    var startMinute=new Date(assignment.Scheduleddate).getMinutes();
                    var endYear=new Date(assignment.Enddate).getFullYear();
                    var endMonth=new Date(assignment.Enddate).getMonth()+1;
                    var endDate=new Date(assignment.Enddate).getDate();
                    var endHour=new Date(assignment.Enddate).getHours();
                    var endMinute=new Date(assignment.Enddate).getMinutes();  
                    return(

                        <div value={assignment.filename} key={index} className="cdesign">
                            <div className="timedetails">
                            </div>
                            <h1>{assignment.originalname}</h1>
                            <div className="datetime">
                              <p>Scheduled date: {startDate}-{startMonth}-{startYear},{startHour}:{startMinute}</p>
                              <p>End date:{endDate}-{endMonth}-{endYear},{endHour}:{endMinute}</p>
                            </div>
                            <button value={assignment.filename} data-ext={assignment.originalname} onClick={handlefile} className="btnp">Download</button>
                            <button value={assignment.filename} className="btnp" data-end={assignment.Enddate} onClick={uploadfile}>Upload</button>

                        </div>  
                    )
                })
            }
        </div>
    )
        }
}

export default Studentassignment
//                            <button value={assignment.filename} className="btnp" onClick={uploadfile(assignment)}>Upload</button>
