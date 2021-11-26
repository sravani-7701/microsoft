import React,{useState,useEffect} from 'react'
import './Studenthome.css'
function Background() {
    const weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

   /* const url = "https://api.quotable.io/random";
    function generateQuote(){
       fetch(url)
      .then(function(data) {
             return data.json();
        })
        .then(function(data){    
        document.getElementById("quote").innerHTML = data.content; document.querySelector(".author").innerHTML = "- " + data.author;
       })
     .catch(function(err) {
        console.log(err); 
        });
     }*/
    
    var [date,setDate] = useState(new Date());
   /* useEffect(()=>{
        generateQuote();
    },[])*/
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )//this will update the timer every second
        return function cleanup() {
            clearInterval(timer);
        }
    });

    return (

            <div className="homepage">
                <div className="times"> 
                    <p>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</p>
                    <p>{weekday[date.getDay()]}</p>
                    <p>{date.getDate()},{month[date.getMonth()]},{date.getFullYear()}</p>
                </div>
            </div>
    )
}

export default Background
/*                <div className=" quotecontainer">
                  <div id="quote">
                      Don't forget: life is a race, if you don't run fast, you'll get trampled
                  </div>
                 <div className="author">
                     - Anonymous 🎭
                 </div>
               </div>
*/