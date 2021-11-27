import React,{useState} from 'react'
import './Login.css'
import {useHistory} from 'react-router-dom'
var Loader = require('react-loader');
function Login() {
    const[loader,setloader]=useState(true);
    var [email,setemail]=useState("");
    var [password,setpassword]=useState("");
    let history = useHistory();
    const loginUser=async(e)=>{
        setloader(false);
        e.preventDefault();
        const res=await fetch('/login',{
            method:"POST",
            credentials:"include",
            headers:{
              'Content-type':"application/json",
            },
            body:JSON.stringify({email,password})
          });
        const data=await res.json();
        if(res.status===400||!data){window.alert('Invalid credentials');setloader(true); }
        else{
            setloader(true);
            history.push('/home');
            
        }
        setemail("");
        setpassword("");
    }
    const redirectSignup=()=>{    
        history.push('/signup'); 
    }
    return (
        <div>
            <div className="total">
                <div className="color1"></div>
                <div className="color2"></div>
                <div className="color3"></div>
                <div className="box">
                    <div className="container">
                        <div className="form">
                            <Loader loaded={loader}/>
                            <h2>Login </h2>
                            <form onSubmit={loginUser} method="POST"> 
                               <div className="inputBox">
                                    <input type="text" placeholder="Username" value={email} required
                                    onChange={(e)=>{setemail(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                    <input type="password" placeholder="password" value={password} required
                                    onChange={(e)=>{setpassword(e.target.value)}}/>
                                </div>
                                <div className="inputBox">
                                    <input  style={{backgroundColor:"pink"}} type="submit" value="Login"/>
                                </div>
                                <p className="forgeta"> Don't have an account? <button style={{backgroundColor:"pink"}} onClick={redirectSignup}>Sign up</button></p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
