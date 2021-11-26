import React from 'react'
import Chats from './Chats/Chats'
import Activity from './Activity/Activity'
import Calls from './Calls/Calls'
import Teams from './Teams/Teams'
export default function Helper({state,user}) {
    if(state===0){
        return <Activity/>
    }
    else if(state===1){
        return <Teams user={user}/>
    }
    return <h1>Hello</h1>
}

