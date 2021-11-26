import React from 'react'
import Default from './Default'
import Card from './Card'
function Teams({user}) {
    if(!user.teams||!user.teams.length){
        return <Default/>
    }
    else{
        let teams=user.teams;
    return (
        <div className="card teams">   
        {
            teams.map((team)=>{
               return <Card team={team}/>
            })
        }
        </div>
    )
    }
}

export default Teams
