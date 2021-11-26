import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import "./Teaminterface.css"
import Filesview from './Filesview';
var FormData = require('form-data');
var Loader = require('react-loader');
function File() {
  let history = useHistory();
  const[loader,setloader]=useState(true);
  let {id}=useParams();
  if(!id){
    history.push('/home');  
  }
  const[teamdetails,setteamdetails]=useState(null);
  var [selectedfile,setselectedfile]=useState(null);
   const chooseFile=async(e)=>{
      try{
        setloader(false);
      e.preventDefault();
      const formData=new FormData();
      formData.append('name',"ss");
      formData.append('file',selectedfile)
      const res= await fetch(`/upload/${id}`,{
            method: "POST",
            headers: {
              'Accept': 'application/json',
            },
            body:formData,
      })
      if(res.status===200){
        alert("File success uploaded");
        document.querySelector(".jumbfrm").style.display="none";
        document.querySelector("#exampleFormControlFile1").value=null;
      }
      else{
        const data=await res.json();
        console.log(data.message);
      }
      setloader(true);
    }
    catch(err){
      console.log(err);
    }
    }
    const  changeFile=(e)=>{
        console.log("change");
         setselectedfile(e.target.files[0]);
    }
    const cancelform=(e)=>{
      e.preventDefault();
      document.querySelector(".jumbfrm").style.display="none";
    }
    const uploadfile=()=>{
      document.querySelector(".jumbfrm").style.display="block";
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
          setteamdetails(data);
          setloader(true)
      }
      catch(err){
          console.error(err);
      }
      setloader(true);
  } 
   useEffect(() =>{getteam()},[]);
    return (
        <div className="container">
            <Loader loaded={loader}/>
            <button className="btn button" onClick={uploadfile}>Upload</button>
            <div className="jumbfrm">
            <form>
              <div className="form-group">
              <label htmlFor="exampleFormControlFile1">Input File</label>
              <input type="file"  required className="form-control-file" id="exampleFormControlFile1" onChange={changeFile}/>
              </div>
              <div className="form-button">
              <button type="submit" onClick={chooseFile} className="btnp">Submit</button>
              <button type="submit" onClick={cancelform} className="btnp">Cancel</button>  
              </div>
            </form>
            </div>
            <div className="classFiles">
              {
                teamdetails!==null?teamdetails.Files.length>0?<Filesview files={teamdetails.Files}/>:<></>:<></>
              }
             </div>
        </div>
    )
}

export default File
