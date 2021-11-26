import React, { Component } from 'react';
import './Home.css';
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import SimpleCard from './Simplecard/Simplecard';
import plagiarism from "./assets/plagiarism.jpg"
import performance from './assets/performance.jpg';
import assignment from './assets/assignment.jpeg';
import organise from './assets/organise.jpg';
import AboutUs from "./About/About";

class Home extends Component {
	render() {
		return (
			<div>
				<div className="content-main">
					<Header/>
					<div className="content" id="homepage-flex">
						<SimpleCard
							image={plagiarism}
							title='Discussion form'
							body='Anyone in the team can post a question and also answer others questions easily. This way students can stay connected ' />
						<SimpleCard
							image={organise}
							title='Stay Organised'
							body='It has separate interface for students and professors. Students can have their track of their marks and assignments.' />
						<SimpleCard
							image={assignment}
							title='Assignment'
							body='It allows professors to assign tasks to students and students can submit their answer sheets using EasyMonitor.' />
						<SimpleCard
							image={performance}
							title='Video call'
							body='Members in the team can connect with a video call and also with others ans can share their video link with others' />
					</div>
					<AboutUs />
				</div>
				<Footer className="footer" />
			</div>
		)
	}
}

export default Home;