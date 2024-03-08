import Header from "../components/Header"
import Navigation from "../components/Navigation"
import Podcast from "../components/Podcast"

const page = () => {
  return (
    <div>
       <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      <Podcast />
    </div>
  )
}

export default page
