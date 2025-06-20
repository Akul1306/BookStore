import { Link} from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({destination = '/'}) => {
  return (
    <div classname='flex'>
        <Link
        to = {destination}
        classname='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeft classname = 'yexy-2xl' />
        </Link>        
        </div>
  )
}

export default BackButton