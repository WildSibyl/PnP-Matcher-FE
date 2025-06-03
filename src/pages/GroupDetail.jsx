import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getSingleGroup } from "../data/groups";

const GroupDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getSingleGroup(id);
        console.log("Data ", data);
        setGroupDetails(data);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!groupDetails) return <p>Loading...</p>;

  //Check if User is Author of the Group
  const isAuthor = groupDetails.author.id === user._id;

  return (
    <div className="!text-pnp-white">
      <p>{groupDetails.name}</p>
      <button onClick={() => navigate(-1)}>Back</button>
      {isAuthor ? <button>Edit</button> : <button>Send DM</button>}
    </div>
  );
};

export default GroupDetail;
