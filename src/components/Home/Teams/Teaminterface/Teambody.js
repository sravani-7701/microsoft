import React from 'react'
import {useParams} from 'react-router-dom';
import File from './File.js'
import AddStudent from './AddStudent.js'
import Studentassignment from './Assignment/Studentassignment'
import TeacherAssignment from './Assignment/TeacherAssignment'
import VideoHome from './Video/VideoHome'
function Teambody({item}) {
    let {isAdmin}=useParams();
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
        return <VideoHome/>
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
