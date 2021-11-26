import React ,{useState,useEffect}from 'react'
import './Assignment.css'
import { useParams } from "react-router-dom";
var FileSaver = require('file-saver');
const axios = require('axios');
var Loader = require('react-loader');
function Answers() {
    let {id,filename}=useParams(); //requiring team id and assignment fime from url parameters
    const[team,setteam]=useState({});
    const[loader,setloader]=useState(true);
    const getteam=async() =>{
        try{
            setloader(false);
            const res= await fetch(`/teamdetails/${id}`,{ //fecth teamdetails with particular id
                method:"GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            const data=await res.json();
            if(!res.status===200){
                setloader(true);
                const error=new Error(res.error);
                throw error;
            }  
            setteam(data);
            setloader(true);
        }
        catch(err){
            console.log(err);
            setloader(true);
        }
    }
    useEffect(()=>{getteam()},[]);
    const handlefile=(e)=>{ //on clicking the file file will be downloaded.
        setloader(false);
        alert("downloading started");
        var filename=e.currentTarget.getAttribute('value');
        var originalname=e.currentTarget.getAttribute('data-ext');
        var id=e.currentTarget.getAttribute('data-id');
        axios({
         method: "GET",
         url: `/file/${filename}`,
         responseType: "blob"
       })
         .then(response => {
             FileSaver.saveAs(response.data,`${id}.${originalname}`);
         })
         .then(() => {
           console.log("Completed");
         })
         setloader(true);
     }
     console.log(team);
    let required;
    if(team!==undefined && team.Assignments){
    let assignments=team.Assignments
      required=assignments.filter(function(assignment){  //filter assignments with repected assignment filename
        return (assignment.filename===filename)  
      })
    }
    if(!team){         // if team is not found return empty div
        return <></>
    }
    //if no student has submitted answers
    if(!required||!required[0].Studentanswers||!required[0].Studentanswers.length) return <h1>No student submited Answers</h1>
    else{
        //if we have student answers return them 
    return (
        <div>
            <Loader loaded={loader}/>
             {  required[0].Studentanswers.map( (answer,index)=>{
                  return(
                   <div key={index} value={answer.filename} data-ext={answer.originalname} data-id={answer.id} onClick={handlefile} className="cdesign">
                       <p>{answer.id}</p>
                  </div>
                  )
                })
            }

        </div>
    )
    }
}

export default Answers
