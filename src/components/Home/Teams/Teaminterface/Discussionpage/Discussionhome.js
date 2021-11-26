import React, { useEffect, useState} from "react";
import Navbarsearch from "./Navbarsearch";
import QuestionBox from "./QuestionBox";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, IconButton, List, ListItem, Paper, TextField } from '@material-ui/core'
import { Card, Row } from 'react-bootstrap'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { BrowserRouter as Router, Switch, Route,useParams } from "react-router-dom";
import Pusher from "pusher-js";
const Discussionhome = () => {
  const {id,userid,username}=useParams();
  console.log(userid);
  const [posts,setposts] = useState([]);
  const[query,setquery]=useState("");
  const getdiscussions=async()=>{
  try{
      setposts([]);
      const res= await fetch(`/discussion/${id}`,{
          method:"GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials:"include"
      });
      const dataarray=await res.json();
      setposts([...dataarray]);
      console.log(dataarray);
      if(!res.status===200){
          const error=new Error(res.error);
          throw error;
      }
      
  }
  catch(err){
      console.error(err);
  }
  } 
  const handleposts=(data)=>{
    setposts([...posts,data]);
  }
  useEffect(()=>{getdiscussions()},[]);
  useEffect(() => { //use pusher api to fetch discussions in real time
    Pusher.logToConsole = true;
    var pusher = new Pusher('efe402f7959d9ab3433e', {
        cluster: 'ap2'
      });
    const channel = pusher.subscribe("questions");
    channel.bind("insertion", (data) => {
      if(data.team_id ===id){
        console.log(posts.length);
        console.log(data);
        handleposts(data);
      }

    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [posts]);
  const Like=async(post)=>{ //like the post
      try{
        const res=await fetch("/like",{
          method: "PUT",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
           id:post._id,userid:userid,teamid:id
          })
        });
        const data=await res.json();
        setposts([...data]);
       }
       catch(err){
           console.error(err);
       }
  }
  const Dislike=async(post)=>{ //dislike
    try{
      const res=await fetch("/dislike",{
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
         id:post._id,teamid:id,userid:userid
        })
      });
      alert("re");
      const data=await res.json();
        console.log(data);
        setposts([...data]);
      
     }
     catch(err){
         console.error(err);
     }
}
const makeComment=async(comment,postid)=>{ //post a comment
  try{
    const res=await fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            postid,
            comment,teamid:id,
            username
        })
      })
    if(res.status===200){
      const data=await res.json();
      setposts([...data]);
    }
}  
catch(err){
  console.log(err);
}
}

  return (
    <div>
      <Navbarsearch/>
      <QuestionBox team_id={id} owner_id={userid} owner={username}/>
      {posts.map((item, index) => {
               return (
                 <div key={index} style={{marginTop:"40px"}}>
                  <Row className="justify-content-md-center" key={index} style={{fontSize:"20px"}}> 
                     <div className="col-12 col-md-8 card-post">
                        <Paper elevation={3} >
                           <Card>
                           <div className="QuestionBox__user">
                              <Avatar alt="User Profile" />
                               <h3 className="user__username">{item.owner}</h3>
                           </div>
                              <Card.Body>
                                 <h1 style={{fontSize:"30px"}}> {item.question}</h1>
                              </Card.Body>
                              <Card.Footer className="text-muted">
                                 <div>
                                    {
                                       item.likes.includes(userid)
                                       ? 
                                       <IconButton onClick={() => {Dislike(item)}}>
                                          <FavoriteIcon style={{fontSize:"40"}}/>
                                       </IconButton>
                                       :
                                       <IconButton onClick={() => {Like(item)}}>
                                          <FavoriteBorderIcon style={{fontSize:"40"}}/>
                                       </IconButton>
                                    }
                                 </div>
                                 <div className={item._id}>
                                    {item.likes.length} Likes
                                 </div>
                                 <Accordion>
                                    <AccordionSummary
                                       expandIcon={<ExpandMoreIcon />}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header"
                                    >
                                       Comments
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <List>
                                             {
                                                item.comments.map(record => {
                                                   return (
                                                      <>
                                                         <Divider/>
                                                          <h3 style={{fontSize:"30"}}>{record.username}</h3>
                                                          <p style={{fontSize:"30"}}>{record.comment}</p>                                 
                                                       </>
                                                   )
                                                })
                                             }
                                             <Divider/>
                                             <ListItem style={{fontSize:"40"}}>
                                                <form onSubmit={(e) => {
                                                   e.preventDefault()
                                                   makeComment(e.target[0].value, item._id)
                                                }}>
                                                   <TextField style={{fontSize:"40"}}
                                                      id="input-with-icon-textfield"
                                                      label="Add a comment"
                                                   />
                                                </form>
                                             </ListItem>
                                          </List>
                                    </AccordionDetails>
                                 </Accordion>
                              </Card.Footer>
                           </Card>
                        </Paper>
                     </div>
                  </Row>
                  </div>
               )
            })}
    </div>
  );
};

export default Discussionhome;
  /*                                    {
                                       item.upvotes.includes(state._id)
                                       ? 
                                       <IconButton onClick={() => {unlikePost(item._id)}}>
                                          <FavoriteIcon/>
                                       </IconButton>
                                       :
                                       <IconButton onClick={() => {likePost(item._id)}}>
                                          <FavoriteBorderIcon/>
                                       </IconButton>
                                    }
*/