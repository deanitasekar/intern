import React from "react";
import Navbar from "./navbar";
import Hero from "./_components/hero.main";
import CaseStudies from "./_components/case-studies.main";
import Testimonials from "./_components/testimonials.main";
import RecentWork from "./_components/recent-work.main";
import GetInTouch from "./_components/get-in-touch.main";

const HomepageModule = () => {
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

export default HomepageModule;