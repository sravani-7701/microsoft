// this the page where student can submit answers to the assignment
import React,{useState} from 'react'
import './Assignment.css'
import {useParams } from 'react-router-dom';
var Loader = require('react-loader');
function Submitanswers() {
    const{id,filename,userid}=useParams();
    const[loader,setloader]=useState(true);
    var [selectedfile,setselectedfile]=useState(null);
    const submitfile=async(e)=>{ //submitting the file by sending it to the server
        try{
          setloader(false);
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',"ss");
        formData.append('file',selectedfile)
        const res= await fetch(`/submitassignment/${id}/${filename}/${userid}`,{
              method: "POST",
              headers: {
                'Accept': 'application/json',
              },
              body:formData,
        })
        if(res.status===200){
          alert("success");
          document.querySelector("#exampleFormControlFile1").value=null;
          setloader(true);
        }
        else{
            const data=await res.json();
            alert(data.message);  
            setloader(true);
        }
      }
      catch(err){
        console.log(err);
      }
      }
      const  changeFile=(e)=>{
         setselectedfile(e.target.files[0]); //dynamically change the selected file to choosen file
      }
    return (
        <div className="createformj">
          <Loader loaded={loader}/>
             <form>
                <div className="form-groupi">
                    <label htmlFor="exampleFormControlFile1" className="lbl">Input File</label>
                    <input type="file"  required className="form-control-file" id="exampleFormControlFile1" onChange={changeFile}/>
                </div>
                     <button type="submit" onClick={submitfile}  className="btnk">Submit</button>
            </form>
        </div>
        
    )
}

export default Submitanswers
