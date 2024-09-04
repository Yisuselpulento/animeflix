import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { BiLogIn } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="fixed top-1 right-0 h-[50px] flex w-full justify-between items-center z-50 md:py-8 md:px-32 px-3"> 
      <div className="flex items-center gap-3 justify-between">
        <Link
          to="/"
          >
            <p className="md:text-5xl text-lg font-bold">An<span className="text-primary font-extrabold">i</span>me<span className="text-primary md:text-6xl text-xl font-extrabold">Flix</span></p>
          </Link>
          <SearchBar />
          <div className="md:hidden" onClick={toggleNav}>
            {isOpen ? (
              <IoClose className="text-primary text-3xl hover:text-opacity-80" />
            ) : (
              <GiHamburgerMenu className="text-primary text-3xl hover:text-opacity-80" />
            )}
          </div>
      </div>  
      <nav className={`md:flex gap-4 md:items-center ${isOpen ? "flex" : "hidden"} flex-col md:flex-row md:static fixed md:top-0 md:left-0 top-14 right-0 w-[200px] bg-slate-900 p-10 md:bg-transparent md:h-auto md:w-auto md:p-0  md:gap-4 gap-8 pr-5 pt-10 items-end`}>
      <ul className="flex flex-col md:flex-row gap-5 md:items-center items-end w-full">
            <li className="w-full flex">
              <Link className="md:hover:text-primary md:w-[50px] text-sm bg-primary hover:bg-opacity-85 md:bg-transparent  w-full md:p-0 p-3 rounded-l-lg" to="/">
                Inicio
              </Link>
            </li>
            <li className="w-full flex">
              <Link className="md:hover:text-primary md:w-[50px] w-full text-sm bg-primary hover:bg-opacity-85 md:bg-transparent  p-3 rounded-l-lg md:p-0" to="/top-anime">
                Top 10
              </Link>
            </li>
            <li>
              <Link
                className="py-2 bg-primary rounded hover:bg-opacity-70 text-sm font-bold flex gap-2 w-[150px] items-center justify-center"
                to="/register"
              >
                <BiLogIn className="text-xl" />
                Registrate
              </Link>
            </li>
          </ul>

      </nav>
    </div>
  )
}

export default NavBar