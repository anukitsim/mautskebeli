import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import FacebookNews from "./FacebookNews";

const HomePageMain = () => {
  return (
    <div className="w-11/12 mx-auto mt-6 flex flex-row gap-5">
      <Sidebar />
      <div className="w-10/12 flex-col gap-6">
        <section className='w-full h-[443px] border flex p-6 justify-center border-black rounded-[6px] bg-[url("https://www.mautskebeli.ge/wp-content/uploads/2024/01/maxresdefault-3-1.jpg")] bg-cover bg-center'>
          <div className="flex flex-row justify-between w-full items-center">
            <Image
              src="/images/arrow-left.svg"
              alt="arrow"
              width={56}
              height={56}
            />
            <Image
              src="/images/arrow-right.svg"
              alt="arrow"
              width={56}
              height={56}
            />
          </div>
        </section>
        <FacebookNews />
      </div>
    </div>
  );
};

export default HomePageMain;
