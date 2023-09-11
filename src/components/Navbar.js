import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { TbLogout } from "react-icons/tb"
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Navbar = () => {
  const [theme, setTheme] = useState(null);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth >= 768) {
        setNav(nav);
        return;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [nav]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    alert("Are you sure you want to logout?")
    navigate("/");
    signOut(auth);
  }
  return (
    <div className="dark:bg-gray-800 transition ease-in-out shadow-md sticky top-0 flex justify-between md:justify-between lg:justify-evenly items-center h-20 w-full mx-auto px-4 z-30">
      <Link
        to="top"
        spy={true}
        smooth={true}
        duration={500}
        className="group text-3xl font-bold cursor-pointer animate-bounce"
      >
        <a href="/" className="flex items-center">
          <img
            src={theme === "dark"
              ? "https://scontent.xx.fbcdn.net/v/t1.15752-9/373103932_672405034841783_4249776846386472861_n.png?_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeEOh9XvSA2QK8RIPMbEMW9VCRklTJee450JGSVMl57jnQrgeHESsGwtpKvsZz-_4OqfCmUHitZ_IoymrfIfdLkL&_nc_ohc=_XmCbIxxQFIAX_9Q5Av&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_ht=scontent.xx&oh=03_AdTFdcA7Xm_sDQuplz43Cbh4Fa2Dq5dmNoS2FWqaus7hAg&oe=65207F25" 
              : "https://scontent.xx.fbcdn.net/v/t1.15752-9/373344364_1732329210513847_5300429586243865596_n.png?_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeECikBVtKEEDlhwOf9-GXEZzi9ZnD-_JdDOL1mcP78l0Axku2OHnxrKnPuns1k7xnEzJ6pojU9_Pk6RjC92CPdH&_nc_ohc=46HUrpCp4e8AX_Vbo9I&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_ht=scontent.xx&oh=03_AdTERX3rq3MiCUIQm794wzx7j21ijhjUGvdlW8tws6zh0w&oe=6520CA98" 
            }
            alt="Logo"
            className="w-60 h-20 inline-block"
          />
        </a>
      </Link>
      <ul className="hidden md:flex justify-end md:w-[30%] uppercase">
        <Link
          to="top"
          spy={true}
          smooth={true}
          duration={500}
          onClick={() => navigate("/home")}
          className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-home"
        >
          Home
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          onClick={() => navigate("/home")}
          className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-work"
        >
          About
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => navigate("/home")}
          className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-education"
        >
          Contact
        </Link>
        <div
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => navigate("/home/reservation")}
          className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-education"
        >
          Reservation
        </div>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => navigate("/home")}
          className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-education"
        >
          Gallery
        </Link>
        <div
          onClick={toggleTheme}
          className="flex justify-center items-center cursor-pointer"
        >
          {theme === "dark" ? (
            <FiSun size={30} className="m-2 text-yellow-500" />
          ) : (
            <FiMoon size={30} className="m-2 text-blue-500" />
          )}
        </div>
        <div
          onClick={handleLogout}
          className="flex justify-center items-center cursor-pointer ml-2"
        >
          <TbLogout size={30} />
        </div>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} className="cursor-pointer dark:text-white" />
        ) : (
          <AiOutlineMenu size={20} className="cursor-pointe dark:text-white" />
        )}
      </div>
      <div
        className={
          nav
            ? "flex flex-col items-center py-6 fixed left-0 top-0 h-full w-[75%] dark:bg-gray-800 dark:border-r-black ease-in-out duration-500"
            : "fixed left-[-100%] "
        }
      >
        <Link
          to="top"
          spy={true}
          smooth={true}
          duration={500}
          className="group text-3xl font-bold cursor-pointer "
        >
          <a href="/" className="flex items-center">
            <img
              src={theme === "dark"
                ? "https://scontent.xx.fbcdn.net/v/t1.15752-9/373103932_672405034841783_4249776846386472861_n.png?_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeEOh9XvSA2QK8RIPMbEMW9VCRklTJee450JGSVMl57jnQrgeHESsGwtpKvsZz-_4OqfCmUHitZ_IoymrfIfdLkL&_nc_ohc=_XmCbIxxQFIAX_9Q5Av&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_ht=scontent.xx&oh=03_AdTFdcA7Xm_sDQuplz43Cbh4Fa2Dq5dmNoS2FWqaus7hAg&oe=65207F25" 
                : "https://scontent.xx.fbcdn.net/v/t1.15752-9/373344364_1732329210513847_5300429586243865596_n.png?_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeECikBVtKEEDlhwOf9-GXEZzi9ZnD-_JdDOL1mcP78l0Axku2OHnxrKnPuns1k7xnEzJ6pojU9_Pk6RjC92CPdH&_nc_ohc=46HUrpCp4e8AX_Vbo9I&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_ht=scontent.xx&oh=03_AdTERX3rq3MiCUIQm794wzx7j21ijhjUGvdlW8tws6zh0w&oe=6520CA98" 
              }
              alt="Logo"
              className="w-60 h-20 inline-block "
            />
          </a>
        </Link>
        <ul className="uppercase p-4 flex flex-col text-center ">
          <Link
            to="top"
            spy={true}
            smooth={true}
            duration={500}
            onClick={handleNav}
            className="p-3 dark:text-white hover:text-blue-500 rounded-xl font-semibold cursor-pointer caligraphy-home "
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={handleNav}
            className="p-3 dark:text-white hover:text-blue-500 rounded-xl font-semibold cursor-pointer caligraphy-work "
          >
            About
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleNav}
            className="p-3 dark:text-white hover:text-blue-500 rounded-xl font-semibold cursor-pointer caligraphy-education"
          >
            Contact
          </Link>
          <div
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={() => navigate("/home/reservation")}
            className="p-3 dark:text-white hover:text-blue-500 transition ease-in-out rounded-xl font-semibold cursor-pointer caligraphy-education"
          >
            Reservation
          </div>
          <div
            onClick={toggleTheme}
            className="flex justify-center items-center cursor-pointer"
          >
            {theme === "dark" ? (
              <FiSun size={30} className="m-2 text-yellow-500" />
            ) : (
              <FiMoon size={30} className="m-2 text-blue-500" />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;