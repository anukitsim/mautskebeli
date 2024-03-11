"use client"



import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Donation from "../donation/page";

const DonationPopup = ({}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showDonationPopup, setShowDonationPopup] = useState(true);

  // Function to close the donation popup
  const closeDonationPopup = () => {
    setShowDonationPopup(false);
  };

  const donationModalRef = useRef(null);

  // Function to show the close button after a delay
  useEffect(() => {
    const showCloseButtonAfterDelay = () => {
      setTimeout(() => {
        setShowCloseButton(true);
      }, 2000); // 2-second delay
    };

    showCloseButtonAfterDelay(); // Show close button after a delay
  }, []);

  // Event listener to close the donation popup when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (donationModalRef.current && !donationModalRef.current.contains(e.target)) {
      closeDonationPopup();
    }
  };

  useEffect(() => {
    // Add the event listener when the donation popup is shown
    document.addEventListener("click", handleOverlayClick);

    // Remove the event listener when the component is unmounted or the donation popup is closed
    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [showDonationPopup]);

  if (!showDonationPopup) return null

  return (
    <div className="donation-modal-overlay ">
      <div className="donation-modal  bg-gradient-to-r from-[#D2D4DC] to-[#E0DBE8]" ref={donationModalRef}>
        {/* Close button at the top of the modal with delayed appearance */}
        {showCloseButton && (
          <button className="close-button" onClick={closeDonationPopup}>
            <Image src='/images/cross.svg' alt='close' width={30} height={30} />
          </button>
        )}
        <Donation />
      </div>
    </div>
  );
};

export default DonationPopup;
