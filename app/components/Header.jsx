import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 w-full  flex bg-white items-center  justify-between ">
      <div className="w-11/12 flex flex-row justify-between mx-auto items-center">
        <Link href='/'>
          <Image src="/images/logo.png" alt="logo" width={116} height={32} />
        </Link>

        <ul className="flex gap-8">
          <Link
            href="#"
            className="flex gap-2.5 text-xs justify-center items-center"
          >
            <Image
              src="/images/pirdapiri-eteri.png"
              alt="pirdapiri eter"
              width={20}
              height={20}
            />
            <span className="md:block sm:hidden">პირდაპირი ეთერი</span>
          </Link>
          <Link
            href="/donation"
            className="flex gap-2.5 text-xs justify-center items-center"
          >
            <Image
              src="/images/donacia.png"
              alt="pirdapiri eter"
              width={20}
              height={20}
            />
            <span className="md:block sm:hidden">დონაცია</span>
          </Link>
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
