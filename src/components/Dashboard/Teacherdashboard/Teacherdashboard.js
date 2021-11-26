import React,{useState} from 'react'
import  Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Helper from '../Helper'
import './Teacherdashboard.css'
function Teacherdashboard() {
    const[state,setstate] =useState(0);
    return (
        <div className="total">
            <Header/>
            <div className="body"> 
            <div className="left">
                  <Sidebar state={state} setstate={setstate}/>
              </div>  
              <div className="right">
                   <Helper state={state}/>
              </div>
            </div>
        </div>
    )
}

export default Teacherdashboard
