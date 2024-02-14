import Image from "next/image";

const Articles = () => {
  const handleHover = (event) => {
    event.target.style.filter = "none";
  };

  return (
    <>
    <div className="flex flex-row justify-between pl-[5%] pr-[5%] w-11/12 mx-auto mt-[150px]">
        <p>სტატიები</p>
        <p>ყველას ნახვა</p>
    </div>
     <div className="w-11/12 mx-auto  mt-[50px] relative flex flex-row gap-10 justify-center">
      <div className="flex w-[380px] h-[599px] flex-col items-center relative bg-[#E0DBE8] bg-opacity-40">
        {/* Overlay div */}
        <div className="flex w-[330px] h-[43px] justify-center items-center gap-10 flex-shrink-0 rounded-r-[4px 4px 4px 4px] bg-[#CCC] z-10 absolute top-[-20px] text-[#000] text-[14px]">
          დევნილი ახალგაზრდების რეალობა და იდეოლოგიური ოპტიმიზმი
        </div>
        <div className="w-[30px] h-[50px] absolute right-[-5px] top-[-20px] z-10">
          <Image
            src="/images/Rectangle.png"
            alt="corner"
            width={30}
            height={50}
            className=""
          />
        </div>

        {/* Background div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage:
              "url('https://www.mautskebeli.ge/wp-content/uploads/2024/01/devnilebi.png')",
              backgroundSize: "cover",
            backgroundPositionX: 'top',
            filter: "blur(17px)",
            // height: "220px",
          }}
          // onMouseEnter={handleHover}
          // onMouseLeave={(event) => (event.target.style.filter = "blur(8px)")}
        ></div>

        {/* Positioned h1 element */}
        <h1 className="text-black font-bold text-[20px] absolute top-[45%] left-4 pr-3 whitespace-nowrap">
          ავტორი: თათია დიღმელაშვილი
        </h1>
        <p className="text-[#767676] text-[12px] absolute top-[55%] left-4 p-3">
          ადამიანების თვითგანხორციელებისთვის ცენტრალურია თანასწორი
          შესაძლებლობები, თუმცა ისეთი ეკონომიკური წესრიგი, როგორიც კაპიტალიზმია
          და მისი თანმდევი ნეოლიბერალური იდეოლოგია ახალგაზრდების პროფესიულ
          განვითარებასა და წინსვლას მხოლოდ მათი პირადი მონდომებისა და
          პასუხისმგებლობის საკითხად წარმოაჩენს. ახალგაზრდების მომავალი
          კეთილდღეობისთვის მნიშვნელოვანი საფუძველია განათლების მიღება...
        </p>
        <button className="absolute top-[90%] right-[5%] flex justify-center items center bg-[#767676] rounded-[6px] w-[122px] h-[36px] text-[#FFF] text-[12px] pt-[10px]">
          ნახეთ სრულად
        </button>
      </div>

      <div className="flex w-[380px] h-[599px] flex-col items-center relative bg-[#E0DBE8] bg-opacity-40">
        {/* Overlay div */}
        <div className="flex w-[330px] h-[43px] justify-center items-center gap-10 flex-shrink-0 rounded-r-[4px 4px 4px 4px] bg-[#CCC] z-10 absolute top-[-20px] text-[#000] text-[14px]">
        სვანეთის აჯანყების (1875-1876) მთავარი მიზეზები და მისი შედეგები
        </div>
        <div className="w-[30px] h-[50px] absolute right-[-5px] top-[-20px] z-10">
          <Image
            src="/images/Rectangle.png"
            alt="corner"
            width={30}
            height={50}
            className=""
          />
        </div>

        {/* Background div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage:
              "url('https://www.mautskebeli.ge/wp-content/uploads/2024/01/gabuldani-1.png')",
            backgroundSize: "cover",
            backgroundPositionX: 'top',
            filter: "blur(18px)",
            // height: "220px",
          }}
          // onMouseEnter={handleHover}
          // onMouseLeave={(event) => (event.target.style.filter = "blur(8px)")}
        ></div>

        {/* Positioned h1 element */}
        <h1 className="text-black font-bold text-[20px] absolute top-[45%] left-4 pr-3 whitespace-nowrap">
          ავტორი: კოტე გაბულდანი
        </h1>
        <p className="text-[#767676] text-[12px] absolute top-[55%] left-4 p-3">
          მეფის რუსეთი, რომელიც სხვადასხვა გზებით ცდილობდა სვანეთის დამორჩილებას
          ვერაფერს ახერხებდა, რადგან სვანებმა გამოავლინეს უდიდესი პოლიტიკური
          თვითშეგნება და მოქნილობა დიპლომატიასთან ერთად. სვანები სხვადასხვა
          ეპოქაში იბრძოდნენ თავისუფლებისათვის და მათი წინააღმდეგობა მიემართებოდა
          როგორც გარე ძალებს, ასევე შიდა თავადაზნაურთა გაბატონებულ კლასს,
          რომელიც ცდილობდა გლეხების ჩაგვრას....
        </p>
        <button className="absolute top-[90%] right-[5%] flex justify-center items center bg-[#767676] rounded-[6px] w-[122px] h-[36px] text-[#FFF] text-[12px] pt-[10px]">
          ნახეთ სრულად
        </button>
      </div>
      <div className="flex w-[380px] h-[599px] flex-col items-center relative bg-[#E0DBE8] bg-opacity-40">
        {/* Overlay div */}
        <div className="flex w-[330px] h-[43px] justify-center items-center gap-10 flex-shrink-0 rounded-r-[4px 4px 4px 4px] bg-[#CCC] z-10 absolute top-[-20px] text-[#000] text-[14px]">
        ცოდნის კოლონიურობა და მისი ალტერნატივები
        </div>
        <div className="w-[30px] h-[50px] absolute right-[-5px] top-[-20px] z-10">
          <Image
            src="/images/Rectangle.png"
            alt="corner"
            width={30}
            height={50}
            className=""
          />
        </div>

        {/* Background div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage:
              "url('https://www.mautskebeli.ge/wp-content/uploads/2023/12/spinoza-1.jpg')",
              backgroundSize: "cover",
            backgroundPositionX: 'top',
            filter: "blur(17px)",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={(event) => (event.target.style.filter = "blur(8px)")}
        ></div>

        {/* Positioned h1 element */}
        <h1 className="text-black font-bold text-[20px] absolute top-[45%] left-4 pr-3 whitespace-nowrap">
          ავტორი: ანა ბერია
        </h1>
        <p className="text-white text-[14px] absolute top-[55%] left-4 p-3">
          როგორ გვესმის ცოდნა? რას ნიშნავს ცოდნა ჩვენთვის დღეს? როდესაც ცოდნაზე
          ვლაპარაკობთ, თუ დავფიქრდებით, ამაში ყოველთვის იგულისხმება ცოდნა
          რაღაცის შესახებ – ცოდნა რაღაც გარე ობიექტის შესახებ – ესე იგი
          ინფორმაცია ჩვენგან დამოუკიდებლად, ფიქსირებულად, ობიექტ(ურ)ად არსებული
          საგნის შესახებ....
        </p>
        <button className="absolute top-[90%] right-[5%] flex justify-center items center bg-[#767676] rounded-[6px] w-[122px] h-[36px] text-[#FFF] text-[12px] pt-[10px]">
          ნახეთ სრულად
        </button>
      </div>
    </div>
    </>
   
  );
};

export default Articles;
