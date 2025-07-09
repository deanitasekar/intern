import React from "react";
import Navbar from "./navbar.component";
import Hero from "./hero.component";
import CaseStudies from "./case-studies.component";
import Testimonials from "./testimonials.component";
import RecentWork from "./recent-work.component";
import GetInTouch from "./get-in-touch.component";

const LandingPage = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<CaseStudies />
			<Testimonials />
			<RecentWork />
			<GetInTouch />
		</>
	);
};

export default LandingPage;