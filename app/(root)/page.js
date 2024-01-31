"use client"
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import HomePageMain from "../components/HomePageMain";
import HomePageVideoContainer from "../components/HomePageVideoContainer";
import Donation from "../donation/page";
import Image from "next/image";

export default function Home() {
  const [showDonationPopup, setShowDonationPopup] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const donationModalRef = useRef(null);

  // Function to close the donation popup
  const closeDonationPopup = () => {
    setShowDonationPopup(false);
  };

  // Function to show the close button after a delay
  const showCloseButtonAfterDelay = () => {
    setTimeout(() => {
      setShowCloseButton(true);
    }, 2000); // 2-second delay
  };

  // Event listener to close the donation popup when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (donationModalRef.current && !donationModalRef.current.contains(e.target)) {
      closeDonationPopup();
    }
  };

  useEffect(() => {
    // Add the event listener when the donation popup is shown
    if (showDonationPopup) {
      document.addEventListener("click", handleOverlayClick);
      showCloseButtonAfterDelay(); // Show close button after a delay
    }

    // Remove the event listener when the component is unmounted or the donation popup is closed
    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [showDonationPopup]);

  return (
    <main>
      <div className="sticky top-0 z-10">
        <Header />
        <Navigation />
      </div>

      <HomePageMain />
      <HomePageVideoContainer />

      {/* Overlaying modal for the donation popup */}
      {showDonationPopup && (
        <div className="donation-modal-overlay">
          <div className="donation-modal" ref={donationModalRef}>
            {/* Close button at the top of the modal with delayed appearance */}
            {showCloseButton && (
              <button className="close-button" onClick={closeDonationPopup}>
                <Image src='/images/cross.svg' alt='close' width={30} height={30} />
              </button>
            )}
        

            <Donation />
          </div>
        </div>
      )}
    </main>
  );
}
