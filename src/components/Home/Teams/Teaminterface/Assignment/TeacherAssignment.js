import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './Assignment.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
var FileSaver = require('file-saver');
const axios = require('axios');
var Loader = require('react-loader');
function TeacherAssignment() {
   const[loader,setloader]=useState(true);
    const[team,setteam]=useState({});
    const[startdate,setstartdate]=useState(Date.now());
    const[enddate,setenddate]=useState(Date.now());
    const[selectedfile,setselectedfile]=useState(null)
    let {id,isAdmin}=useParams();
    let history = useHistory();
    const  changefile=(e)=>{  //dynamically set the file to choosen file
         setselectedfile(e.target.files[0]);
    }
    const cancelform=(e)=>{  // hide the form 
      e.preventDefault();
      document.querySelector(".jumfrm").style.display="none";
    }
    const openform=()=>{
      document.querySelector(".jumfrm").style.display="block"; // change the form  display 
    }
    const createassignment=async(e)=>{ // send the collected assignment details to server
        try{
        setloader(false);
        e.preventDefault();
        const formData=new FormData();
        var sdate=new Date(startdate);
        var edate=new Date(enddate);
        if(sdate>edate ||sdate<Date.now()){
          alert("please check time details")
        }
        else{
        formData.append('file',selectedfile);
        alert("started");
        const res= await fetch(`https://ms-classrooms.herokuapp.com/createassignment/${id}/${startdate}/${enddate}`,{
              method: "POST",
              headers: {
                'Accept': 'application/json',
              },
              body:formData,
        })
        if(res.status===200){
          alert("File success uploaded");
          const data=await res.json();
          alert(data.message);
          document.querySelector(".jumfrm").style.display="none";
          document.querySelector(".form-ex-t").value=null;
        }
      }
        setloader(true);
      }
      catch(err){
        console.log(err);
        setloader(true)
      }
      }
      const viewresponses=async(e)=>{ // view respones of assignment 
        e.preventDefault();
        var filename=e.currentTarget.getAttribute('value');
        history.push(`/home/teams/${id}/${isAdmin}/${filename}`); // redirects to responses page
      }
      const download=(e)=>{ //download the created assignment
        setloader(false);
        alert("downloading started");
        var filename=e.currentTarget.getAttribute('value');
        var originalname=e.currentTarget.getAttribute('data-ext');
        axios({
         method: "GET",
         url: `https://ms-classrooms.herokuapp.com/file/${filename}`,
         responseType: "blob"
       })
         .then(response => {
             FileSaver.saveAs(response.data,`${originalname}`);
         })
         .then(() => {
           console.log("Completed");
         })
         .finally(() => {setloader(true)})
     }
 
    const getteam=async() =>{
        try{
            setloader(false);
            const res= await fetch(`https://ms-classrooms.herokuapp.com/teamdetails/${id}`,{
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
    if(!team.Assignments||!team.Assignments.length){ // if team does'nt have any assignments
        return(
            <div>
            <Loader loaded={loader}/>
            <button className="btn button" onClick={openform}>Create Assignment</button>
            <div className="jumfrm">
            <form>
              <div className="form-group">
              <label htmlFor="exampleFormControlFile1">Input File</label>
              <input type="file"  required className="form-ex-t" onChange={changefile}/>
              <h2 className="labteach"> Start date</h2>
              <DatePicker
              selected={startdate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date)=>{setstartdate(date)}}
               />
               <h2 className="labteach"> End date</h2>
               <DatePicker
              selected={ enddate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date)=>{setenddate(date)}}
               />
              </div>
              <div className="form-button">
              <button className="btnp" onClick={createassignment}>Submit</button>
              <button className="btnp" onClick={cancelform}>Cancel</button>  
              </div>
            </form>
            </div>
            </div>
        );
    }
    else{ //show if team has assignments
    return (
        <div>
          <Loader loaded={loader}/>
        <button className="btn button" onClick={openform}>Create Assignment</button>
        <div className="jumfrm">
        <form>
          <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Input File</label>
          <input type="file"  required className="form-ex-t" onChange={changefile}/>
          <h2 className="labteach"> Start date</h2>
          <DatePicker
          selected={startdate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date)=>{setstartdate(date)}}
           />
           <h2 className="labteach"> End date</h2>
           <DatePicker
          selected={ enddate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date)=>{setenddate(date)}}
           />
          </div>
          <div className="form-button">
          <button className="btnp" onClick={createassignment}>Submit</button>
          <button className="btnp" onClick={cancelform}>Cancel</button>  
          </div>
        </form>
        </div>
        <div> 
           {
                team.Assignments.map((assignment,index) =>{
                  var startYear=new Date(assignment.Scheduleddate).getFullYear();
                  var startMonth=new Date(assignment.Scheduleddate).getMonth()+1;
                  var startDate=new Date(assignment.Scheduleddate).getDate();
                  var startHour=new Date(assignment.Scheduleddate).getHours();
                  var startMinute=new Date(assignment.Scheduleddate).getMinutes();
                  var endYear=new Date(assignment.Enddate).getFullYear();
                  var endMonth=new Date(assignment.Enddate).getMonth()+1;
                  var endDate=new Date(assignment.Enddate).getDate();
                  var endHour=new Date(assignment.Enddate).getHours();
                  var endMinute=new Date(assignment.Enddate).getMinutes();
                  return(
                        <div value={assignment.filename} key={index} className="cdesign">
                            <Loader loaded={loader}/>
                            <h1>{assignment.originalname}</h1>
                            <div className="datetime">
                              <p>Scheduled date: {startDate}-{startMonth}-{startYear},{startHour}:{startMinute}</p>
                              <p>End date:{endDate}-{endMonth}-{endYear},{endHour}:{endMinute}</p>
                            </div>
                            <button value={assignment.filename} data-ext={assignment.originalname} onClick={download} className="btnp">Download</button>
                            <button className="btnp" value={assignment.filename} onClick={viewresponses}>Responses</button>
                            <div  id="assignmentfrm" className={assignment.filename}>
                              <label>Input File</label>
                              <input type="file"  required className="form-control-file"/>
                              <button>Submit</button>
                            </div>
                        </div>  
                    )
                })
            }
        </div>
        </div>
    )
    }
  }

export default TeacherAssignment
