import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-72  border border-[#000] rounded-[6px]  flex flex-col pt-8 pb-8  pl-6 flex-start gap-8 ">
      <Link href="#" className="flex flex-row gap-3">
        <Image src="/images/shroma.png" alt="shroma" width={20} height={20} />
        <span className="text-[#222] text-[15px]">შრომა</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image
          src="/images/mecniereba.png"
          alt="shroma"
          width={20}
          height={20}
        />
        <span className="text-[#222] text-[15px]">მეცნიერება</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image
          src="/images/ekonomika.png"
          alt="shroma"
          width={20}
          height={20}
        />
        <span className="text-[#222] text-[15px]">ეკონომიკა</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image src="/images/medicina.png" alt="shroma" width={20} height={20} />
        <span className="text-[#222] text-[15px]">მედიცინა</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image
          src="/images/xelovneba.png"
          alt="shroma"
          width={20}
          height={20}
        />
        <span className="text-[#222] text-[15px]">ხელოვნება</span>
      </Link>

      <Link href="#" className="flex flex-row gap-3">
        <Image src="/images/qalaqi.png" alt="shroma" width={20} height={20} />
        <span className="text-[#222] text-[15px]">ქალაქი</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image src="/images/msoplio.png" alt="shroma" width={20} height={20} />
        <span className="text-[#222] text-[15px]">რესურსები</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image
          src="/images/saxli-yvelas.png"
          alt="shroma"
          width={20}
          height={20}
        />
        <span className="text-[#222] text-[15px]">მსოფლიო</span>
      </Link>
      <Link href="#" className="flex flex-row gap-3">
        <Image src="/images/bechduri.png" alt="shroma" width={20} height={20} />
        <span className="text-[#222] text-[15px]">სახლი ყველას</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
