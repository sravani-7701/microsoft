import React from 'react'

function Activityname({type,name}) {
  //if file is added in the team this statement will be dispalyed
    if(type==="fileadded")
  {  return (
        <p>
           A file was added to {name} 
        </p>
    )
  }
  else{
    //else this statement will be displayed.
      return(
          <p>Assignments mentioned in team {name}</p>
      )
  }
}

export default Activityname
