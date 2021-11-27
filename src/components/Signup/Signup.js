import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Signup.css'
var Loader = require('react-loader');
function Signup() {
    const[loader,setloader]=useState(true);
    let history = useHistory();
    var[name,setname] =useState("");
    var[email,setemail] =useState("");
    var[password,setpassword] =useState("");
    var[cpassword,setcpassword] =useState("");
    var[phone ,setphone]=useState("");
    const redirect=()=>{
      history.push('/login');
    }
    const Signup=async(e)=>{
    setloader(false);
    e.preventDefault();
   const res=await fetch("https://ms-classrooms.herokuapp.com/signup",{
     method: "POST",
     credentials:"include",
     headers:{
       "Content-Type": "application/json"
     },
     body:JSON.stringify({
      name,email,phone,password,cpassword
     })
   });
   const data=await res.json();
   if(res.status===422 ||!data){
     window.alert("Invalid Registration");
     setloader(true);
   }
   else{
     window.alert(data.message);
     history.push('./login');
   }
   }
   return (
        <div>
            <div className="total">
                <Loader loaded={loader}/>
                <div className="color1"></div>
                <div className="color2"></div>
                <div className="color3"></div>
                <div className="box">
                    <div className="containeri">
                        <div className="form">
                            <h2>Sign Up</h2>
                            <form onSubmit={Signup} method="POST"> 
                               <div className="inputBox">
                                   <input type="text" placeholder="Name" value={name} required  className="ip"
                                   onChange={(e)=>{setname(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                   <input type="text" placeholder="Phone number" value={phone} required  className="ip"
                                   onChange={(e)=>{setphone(e.target.value)}}/>
                                </div>
                               <div className="inputBox">
                                    <input type="text" placeholder="Email" value={email} required className="ip"
                                    onChange={(e)=>{setemail(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                    <input type="password" placeholder="password" value={password} required className="ip"
                                    onChange={(e)=>{setpassword(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                    <input type="password" placeholder="confirm password" value={cpassword} required className="ip"
                                    onChange={(e)=>{setcpassword(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                    <input style={{backgroundColor:"pink"}} type="submit" value="Sign up"/>
                                </div>
                                <p className="forgeta"> Already have an account? <button style={{backgroundColor:"pink"}} onClick={redirect}>Login</button></p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
