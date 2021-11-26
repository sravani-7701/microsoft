import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landingpage from './components/Landingpage/Landingpage'
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Home from "./components/Home/Home/Home"
import Video from './components/Home/Teams/Teaminterface/Video/Video'
import Discussionhome from './components/Home/Teams/Teaminterface/Discussionpage/Discussionhome';
function App() {
  return (
    <Router>
       <div className="App">
        <Switch>
          <Route exact path="/">
               <Landingpage/>
          </Route>
          <Route  path="/login">
               <Login/>
          </Route>
          <Route  path="/signup">
               <Signup/>
          </Route>
          <Route path="/home">
              <Home/>
          </Route>
          <Route exact path='/calls/:id'> 
          <Video/>
          </Route>
          <Route exact path="/discussion/:id/:userid/:username"> 
            <Discussionhome/>
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App
