import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-1.svg"

import {Poppins, Playfair_Display} from "next/font/google"

const poppins = Poppins({
  subsets: ['latin'],
  weight: "300",
})
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: "900",
})

export default function LandingComponent() {
    return (
      <div className="landing-wrapper flex flex-col justify-center items-center max-sm:px-7 px-16 mt-16">
        <h1 className={`${playfairDisplay.className} min-[360px]:text-7xl sm:text-8xl md:text-9xl 2xl:text-[12.5rem]`}>
          VaultSafe
        </h1>
        <p className={`${poppins.className} min-[360px]:text-2xl md:text-3xl text-center my-9`}>
          Your Secure Online Information Repository
        </p>
        <Link
          href="/new"
          className={`${poppins.className} flex bg-black text-white max-sm:px-6 max-sm:py-4 px-8 py-6 max-sm:text-lg text-xl rounded-xl`}
        >
          Start Using Me
          <Image className="arr-right w-12 self-center ml-4" src={ArrowRight} alt="ArrowRight" priority/>
        </Link>
      </div>
    );
  }