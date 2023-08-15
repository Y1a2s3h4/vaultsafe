import { Link } from "react-router-dom";
import BrandLogo from "../assets/logo.svg";
import MenuIcon from "../assets/menu.svg";
import { useState } from "react";
export default function NavbarComponent() {
  const [toggle, setToggle] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
    console.log("Calling Scroll Event")
    if (window.scrollY >= 80) {
        setColorChange(true);
    }
    else {
        setColorChange(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);
  return (
    <div className={`sticky top-0 left-0 z-20 max-md:px-4 max-md:py-8 py-12 px-16 ${colorChange ? 'bg-white' : ''}`}>
      <nav className="flex justify-between">
        <div className="brand-logo">
          <img className="max-md:w-[32px] self-center" src={BrandLogo} alt="dr-sangeeta-logo" />
        </div>
        <img
          className="max-md:w-10 w-14 self-center lg:hidden block"
          onClick={() => setToggle((prev) => !prev)}
          src={MenuIcon}
          alt="MenuIcon"
        />
        <div className="nav-links self-center max-lg:hidden lg:block">
          <ul className="flex font-poppins text-lg font-medium">
            <li>
              <a
                href="/#home"
                className={`px-8 py-5 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  ["", "#home"].includes(location.hash) &&
                  location.pathname === "/"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className={`px-8 py-5 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#about"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className={`px-8 py-5 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#services"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className={`px-8 py-5 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#contact"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {toggle && (
        <div className="nav-links mt-10 lg:hidden block">
          <ul className="flex flex-col font-poppins text-lg font-medium">
            <li>
              <Link
                to="/"
                className={`w-full block px-6 py-3 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  ["", "#home"].includes(location.hash) &&
                  location.pathname === "/"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="/#about"
                className={`w-full block px-6 py-3 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#about"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className={`w-full block px-6 py-3 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#services"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className={`w-full block px-6 py-3 transition-all duration-150 ease-in border-2 border-solid border-[rgba(0,0,0,0)] ${
                  location.hash === "#contact"
                    ? "active-link"
                    : "hover:border-2 hover:border-solid hover:border-black hover:text-black"
                }`}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
