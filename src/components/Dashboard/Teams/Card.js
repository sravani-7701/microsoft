import React,{useState} from 'react'
function Card({team}) {
   const[teamdetails,setteamdetails]=useState({});
   const getteam=async() =>{
        try{
            const res= await fetch(`/teamdetails/${team}`,{
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
        }
        catch(err){
            console.error(err);
        }
    }
    getteam();
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{teamdetails.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                
            </div>
        </div>
    )
}

export default Card
