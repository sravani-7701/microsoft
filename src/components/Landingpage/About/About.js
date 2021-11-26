import React from 'react'
import './About.css';
import aboutusing from '../assets/about.gif';

function Aboutus() {
  return (
    <div className="container2" id="container2">
      <div className="text-container2">

        <h3 id="aboutush">About Us</h3>
        
        <img className="image-container2" src={aboutusing} />
        <p style={{padding:"13px",margin:0,fontSize:"17px"}}>Our project aims at solving the problems of online classes.
        It’s for teachers, professors as well as students. It is a way of communication between students and professors
        during semester. It has several features
        like seperate teams for subjects, assignment tracking, file sharing,discussion forum.
        Admin of the team of special powers of host a meet for  total team and create assignment and also add a student to  particular team
        Students can submit their tasks and assignments. It will help the professors as well as students to stay organised and focussed during their online semester.
</p>

      </div>

    </div>

  )
}

export default Aboutus