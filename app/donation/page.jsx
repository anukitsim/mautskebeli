"use client";

import React, { useState } from "react";
import Image from "next/image";

const OvalButton = ({ value, onChange }) => {
  const [amount, setAmount] = useState(value || 5);

  const handleIncrement = () => {
    if (amount < 100) {
      setAmount(amount + 1);
      onChange(amount + 1);
    }
  };

  const handleDecrement = () => {
    if (amount > 5) {
      setAmount(amount - 1);
      onChange(amount - 1);
    }
  };

  return (
    <div className="flex items-center relative">
      <div
        className="flex items-center justify-center cursor-pointer absolute left-5"
        onClick={handleDecrement}
      >
        <Image src="/images/minus.png" alt="minus" width={24} height={24} />
      </div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="border border-[#CBCBCB] text-center mx-4 w-[131px] h-[40px] rounded-[40px]"
        value={amount}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          if (!isNaN(newValue) && newValue >= 5 && newValue <= 100) {
            setAmount(newValue);
            onChange(newValue);
          }
        }}
      />
      <div
        className=" flex items-center justify-center cursor-pointer absolute right-5"
        onClick={handleIncrement}
      >
        <Image src="/images/plus.png" alt="minus" width={24} height={24} />
      </div>
    </div>
  );
};
const Donation = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);

  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleApprovedChange = () => {
    setHasApproved(!hasApproved);
  };

  const handleAmountChange = (amount) => {
    // Handle the amount change here, e.g., update state or perform other actions
    console.log('New amount:', amount);
  };


  return (
    <div className="flex w-[380px] border border-[#CBCBCB] gap-[12px] mx-auto flex-col pt-[18px] items-center mt-10 rounded-[12px] ">
       <div className='flex flex-row gap-[119px]'>
        <h2 className='text-[#767676] text-[14px] font-medium'>ოდენობა</h2>
      <h2 className='text-[#767676] text-[14px] font-medium'>სხვა თანხა</h2>
        </div>
        <div className='flex flex-row w-full justify-around  items-start'>
        <OvalButton value={5} onChange={handleAmountChange} />
        <input
          type='text'
          className='border border-[#CBCBCB] text-center mx-4 w-[92px] h-[40px] rounded-[6px]'
        
        />
      </div>
      <form className="w-full mt-[24px] pl-[18px] pr-[18px] ">
        <h2 className="text-[#767676] text-[14px] font-medium">
          პირადი ინფორმაცია
        </h2>
        <input
          type="text"
          className="w-[340px] border border-[#CBCBCB] text-[#000] text-[14px] rounded-[6px] pt-[12px] pb-[12px] pl-[24px] h-[44px] mt-[12px] flex justify-center"
          placeholder="სახელი"
        />

        {/* Custom radio button (styled checkbox) and text for "ანონიმურად" */}
        <div className="flex items-center mt-4">
        <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={handleAnonymousChange}
            style={{ cursor: "pointer" }}
          />
          <label
            htmlFor="anonymous"
            className="text-[#000] text-[14px] cursor-pointer ml-2"
          >
            ანონიმურად
          </label>
        </div>

        <input
          type="text"
          className="w-[340px] border border-[#CBCBCB] text-[#000] text-[14px] rounded-[6px] pt-[12px] pb-[12px] pl-[24px] h-[44px] mt-[12px] flex justify-center"
          placeholder="ელ. ფოსტა"
        />

        {/* Custom radio button (styled checkbox) and text for "ანონიმურად" */}
        <div className="flex items-center mt-4">
        <input
            type="checkbox"
            id="approve"
            checked={hasApproved}
            onChange={handleApprovedChange}
            style={{ cursor: "pointer" }}
            required
          />
          <label
            htmlFor="approve"
            className="text-[#000] text-[14px] cursor-pointer ml-2"
          >
            ვეთანხმები წესებსა და პირობებს
          </label>
        </div>

        <h2 className="text-[#767676] text-[14px] font-medium mt-[24px]">
          გადახდის მეთოდი
        </h2>
        <div className="flex flex-col gap-[8px] mt-[12px] mb-[18px]">
        <button className="w-full border border-[#CBCBCB] h-[48px] flex items-center  flex-row pl-[108px] gap-[8px]">
          <Image src='/images/paypal.png' alt="paypal" width={30} height={30} />
          PayPal
        </button>
        <button className="w-full border border-[#CBCBCB] h-[48px] flex-row flex items-center pl-[108px] gap-[8px]">
        <Image src='/images/card.png' alt="paypal"  width={30} height={30}  />
        Credit/Debit card
        </button>
        </div>
       
      </form>
    </div>
  );
};

export default Donation;
