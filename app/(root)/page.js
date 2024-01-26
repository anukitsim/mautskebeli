import Header from "../components/Header"
import Navigation from "../components/Navigation"
import HomePageMain from "../components/HomePageMain"
import HomePageVideoContainer from "../components/HomePageVideoContainer"

export default function Home() {
  return (
    <main>
      <div className="sticky top-0 z-10">
      <Header />
    <Navigation />
      </div>
  
    <HomePageMain />
    <HomePageVideoContainer />
    </main>
  )
}
