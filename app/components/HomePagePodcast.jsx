import Image from "next/image"

const HomePagePodcast = () => {
  return (
    <mian>
      <div className='w-full mt-[80px] h-[480px] bg-[#8C74B2] pl-[10%]'>
        <Image src='/images/podcast.png' alt="podcast" width={866} height={436} />
      </div>
    </mian>
  )
}

export default HomePagePodcast