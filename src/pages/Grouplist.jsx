import { useNavigate } from "react-router";

const Grouplist = () => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold lg:text-[16rem] text-transparent bg-gradient-to-r from-[#6054e8] to-[#f8485e] bg-clip-text">
        GROUPS
      </h1>
      <p className="text-2xl font-bold text-gray-700">LIST OF YOUR GROUPS</p>
      <button onClick={handleCreateGroup} className="btn-primary-light">
        Create Group
      </button>
    </div>
  );
};

export default Grouplist;
