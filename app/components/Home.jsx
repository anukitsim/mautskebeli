"use client"

import React, { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import HomePageMain from "../components/HomePageMain";
import HomePageVideoContainer from "../components/HomePageVideoContainer";
import Articles from "./Articles";

import DonationPopup from "../components/DonationPopup";
import HomePagePodcast from "./HomePagePodcast";
import MautskebeliGirchevt from "./MautskebeliGirchevt";

const Home = () => {
  const [showDonationPopup, setShowDonationPopup] = useState(true);

  // Function to close the donation popup
  const closeDonationPopup = () => {
    setShowDonationPopup(false);
  };

  return (
    <main>
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      <div>
        <HomePageMain />
        <HomePageVideoContainer />
       <Articles />
       <HomePagePodcast />
       <MautskebeliGirchevt />
      </div>

      {/* Overlaying modal for the donation popup */}
      {showDonationPopup && <DonationPopup onClose={closeDonationPopup} />}
    </main>
  );
};

export default Home;
