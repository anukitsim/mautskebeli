"use client"

import React, { useState } from 'react';

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
    <div className='flex items-center relative'>
      <div
        className='w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer absolute left-5'
        onClick={handleDecrement}
      >
        <span className='text-black'>-</span>
      </div>
      <input
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        className='border border-[#CBCBCB] text-center mx-4 w-[131px] h-[40px] rounded-[40px]'
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
        className='w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer absolute right-5'
        onClick={handleIncrement}
      >
        <span className='text-black'>+</span>
      </div>
    </div>
  );
};

const Donation = () => {
  const handleAmountChange = (amount) => {
    // Handle the amount change here, e.g., update state or perform other actions
    console.log('New amount:', amount);
  };

  return (
    <div className='flex w-[380px] border border-[#CBCBCB] gap-[12px] mx-auto h-[500px] flex-col pt-[18px] items-center mt-10 rounded-[12px] '>
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
    </div>
  );
};

export default Donation;
