import { FaStar  } from "react-icons/fa";

const BannerHead = ({parrafe}) => {
  return (
      <div className="flex gap-3 items-center bg-secundary  p-3 rounded-r border-l-[3px] border-primary mb-4 my-5">
                <FaStar className="text-primary text-2xl" />
                <p>{parrafe}</p>
      </div>
  )
}

export default BannerHead