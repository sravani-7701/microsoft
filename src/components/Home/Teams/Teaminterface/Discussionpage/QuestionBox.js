import React, { useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
function QuestionBox({team_id,owner,owner_id}){
  
  const [question, setQuestion] = useState("");
  const AskQuestion = async (e) => {
    e.preventDefault();
    try{
      const res=await fetch("/discussion",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
         question,team_id,owner,owner_id
        })
      });
      if(res.status===200){
        alert("sucess");
      }
      else{
        alert("check");
      }
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className="QuestionBox">
      <div className="QuestionBox__user">
        <Avatar alt="User Profile" />
        <h4 className="user__username">{owner}</h4>
      </div>
      <div className="QuestionBox__inputField">
        <input
          type="text"
          placeholder="What is your question"
          className="QuestionBox__inputField"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <button
          className="QuestionBox__btn"
          onClick={AskQuestion}
        >
          Ask Question
        </button>
      </div>
    </div>
  );
};

export default QuestionBox;
