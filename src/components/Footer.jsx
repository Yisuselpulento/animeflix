import { Link } from "react-router-dom"
import { FaGithub,FaInstagram  } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-end h-[200px] py-5">
    <p>Made by <span className="text-neutral-400">Monsster</span></p>
   <div className="flex gap-2 mt-3">
      <Link 
        className="hover:scale-125 transition-all"
      to="https://www.instagram.com/_.monsster._/"
      target="_blank"
      rel="noopener noreferrer"
      >
       <FaInstagram className="size-6" />
      </Link>
      <Link 
      className="hover:scale-125 transition-all"
      to="https://github.com/Yisuselpulento"
      target="_blank"
      rel="noopener noreferrer"
      >
       <FaGithub className="size-6" />
      </Link>
    </div> 
  </footer>
  )
}

export default Footer