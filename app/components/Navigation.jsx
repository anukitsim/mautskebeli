import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="w-full h-16 bg-[#8C74B2] flex items-center justify-around">
      <ul className="w-6/12 justify-start text-white text-sm whitespace-nowrap flex  gap-8">
        <Link href='/'>მთავარი</Link>
        <Link href='#'>ტექსტი</Link>
        <Link href='#'>პოდკასტი</Link>
        <Link href='#'>სპორტი</Link>
        <Link href='#'>ჩვენს შესახებ</Link>
        
      </ul>
      <div className="flex flex-col w-4/12 justify-end items-end border-[#E0DBE8]">
      <form className="flex  text-gray-500 border h-9 w-8/12 rounded-lg  focus:outline-none">
          <button type="submit" className="bg-transparent text-transparent h-full px-4">
            <img src="/images/search.png" />
          </button>
          <input
            type="search"
            className="border-none bg-transparent flex-1 px-2 h-full focus:outline-none text-[#E0DBE8]"
          />
        </form>

      
      
    </div>
      
    </nav>
  );
};

export default Navigation;
