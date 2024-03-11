import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import HomePageMain from "../components/HomePageMain";
import HomePageVideoContainer from "./HomePageVideoContainer";


import DonationPopup from "../components/DonationPopup";
import HomePagePodcast from "./HomePagePodcast";
import MautskebeliGirchevt from "./MautskebeliGirchevt";

const Home = () => {
  return (
    <main>
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      <div>
        <HomePageMain />
        <HomePageVideoContainer />
     
       <HomePagePodcast />
       <MautskebeliGirchevt />
      </div>

      {/* Overlaying modal for the donation popup */}
      <DonationPopup/>
    </main>
  );
};

export default Home;