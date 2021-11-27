import React,{useState} from 'react'
import {useParams} from 'react-router-dom';
import './Teaminterface.css'
var Loader = require('react-loader');
function AddStudent() { //add student to current team only admin can do this
    let {id}=useParams();
    const[loader,setloader]=useState(true);
    const[studentemail,setstudentemail]=useState("");
     const addstudent= async(e)=>{
        try{
          setloader(false);
          e.preventDefault();
          const res=await fetch("https://ms-classrooms.herokuapp.com/student",{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
             email:studentemail,id
            })
          });
          if(res.status===200){
              alert("Student added succesfully");
              setstudentemail("");
          }
          else{
              const data=await res.json();
              alert(data.message);
          }
          setloader(true);
        }
        catch(err){
            console.log(err);
            setloader(true);
        }
    }
    return (
        <div className="createformi">
            <Loader loaded={loader}/>
            <form> 
               <div className="form-groupi"> 
                     <label className="lbl" htmlFor="exampleInputEmail1">Add Student</label>
                        <input required type="text" className="fmi" value={studentemail} onChange={(e)=>{setstudentemail(e.target.value)}}/>
                    </div>
                       <button type="submit" onClick={addstudent} className="btnk">Submit</button>
    
                 </form>      
             </div>
    )
}

export default AddStudent
