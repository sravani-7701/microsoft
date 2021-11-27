import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Teaminterface.css'
var Loader = require('react-loader');
var FileSaver = require('file-saver');
const axios = require('axios');
function Filesview({files}) {
  const[loader,setloader]=useState(true);
    const handlefile=(e)=>{
      setloader(false);
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
          setloader(true);
        })
    }
    return (
        <div>
             <Loader loaded={loader}/>
            {
                files.map( (file)=>{
                  return(
                   <div value={file.filename} data-ext={file.originalname} onClick={handlefile} className="cdesign">
                       <p>{file.originalname}</p>
                  </div>
                  )
                })
            }
        </div>
    )
}

export default Filesview
