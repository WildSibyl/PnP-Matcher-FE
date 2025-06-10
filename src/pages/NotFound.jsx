import Ren404 from "../assets/ren/Ren-404.png";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col self-center items-center justify-center gap-4 w-full p-5">
      <p className="text-pnp-white">...Whoops!</p>
      <div className="flex flex-col self-center items-center justify-center w-full ">
        <h1 className="text-8xl font-bold lg:text-[8rem] text-transparent bg-gradient-to-r from-[#6054e8] to-[#f8485e] bg-clip-text">
          404
        </h1>
        <img
          src={Ren404}
          alt="Ren shrugging"
          className="w-[200px] h-[200px] object-contain"
        />
      </div>

      <p className="text-pnp-white">
        In all my travels, I have never been here...
      </p>

      <p className="text-pnp-white text-center italic">
        ✨ Let's go back to the search page! ✨
      </p>
      <button onClick={() => handleBack()} className="btn-primary-light">
        Take me back!
      </button>
    </div>
  );
};

export default NotFound;
