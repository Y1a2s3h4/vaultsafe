import { Link } from "react-router-dom";
import ArrowRight from "../assets/arrow-1.svg";

export default function LandingComponent() {
  return (
    <div className="landing-wrapper flex flex-col justify-center items-center max-sm:px-7 px-16 mt-16">
      <h1 className="font-playfair font-black min-[360px]:text-7xl sm:text-8xl md:text-9xl 2xl:text-[12.5rem]">
        VaultSafe
      </h1>
      <p className="font-poppins font-light min-[360px]:text-2xl md:text-3xl text-center my-9">
        Your Secure Online Information Repository
      </p>
      <Link
        to="/new"
        className="flex bg-black text-white font-poppins font-light max-sm:px-7 max-sm:py-5 px-8 py-6 max-sm:text-lg text-xl rounded-xl"
      >
        Start Using Me
        <img className="self-center ml-4" src={ArrowRight} alt="ArrowRight" />
      </Link>
    </div>
  );
}
