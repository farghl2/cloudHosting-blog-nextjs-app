import { Hero } from "@/components/home/hero"
import WebHostingPlane from "@/components/home/WebHostingPlane"



const HomePage = () => {
  return (
    <section className="fix-height">
     
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Web Hosting Plan
      </h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlane />
        <WebHostingPlane />
        <WebHostingPlane />
      </div>
    </section>
  )
}

export default HomePage