import React,{useState} from 'react'
import {useParams} from 'react-router-dom';
import File from './File.js'
import {useHistory} from 'react-router-dom'
import AddStudent from './AddStudent.js'
import Studentassignment from './Assignment/Studentassignment'
import TeacherAssignment from './Assignment/TeacherAssignment'
import './Teaminterface.css'
import { v4 as uuidv4 } from 'uuid'; 
var Loader = require('react-loader');
function Teambody({item}) {
    const[loader,setloader]=useState(true);
    let history = useHistory();
    let {id,isAdmin}=useParams(); 
    const handlemeet=async()=>{
        setloader(false);
        const l=uuidv4();
        const url=`${window.location.protocol}://${window.location.host}/calls/${l}`;
        const res=await fetch('https://ms-classrooms.herokuapp.com/calls',{
            method:"POST",
            headers:{
              'Content-type':"application/json"
            },
            body:JSON.stringify({url,id})
          });
          setloader(true);
        history.push(`/calls/${l}`);
    }
    if(item==0 && isAdmin==="1"){ // if user is admin of team display teacher assignment
        return <TeacherAssignment/>
    }
    else if(item==0 && isAdmin==="0"){ // if user is student display student assignment
        return <Studentassignment/>
    }
    else if(item==1){
        return <File/>
    }
    else if(item==3){
        return <AddStudent/>
    }
    else if(item==4){
        return <div className="callbutton"> 
            <button className="btnmeeting" onClick={handlemeet}>Host a meeting</button>
        </div>
    }
    else{
    return (
        <div>
         <h1>Teambody</h1>
        </div>
    )
    }
}
export default Teambody
