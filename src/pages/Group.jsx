//to be deleted

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteGroup, getSingleGroup } from "../data/groups";
import GroupSkeleton from "../components/group-comp/GroupSkeleton";
import { AuthContext } from "../context/AuthContextProvider";

const Group = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isAuthor = user && group?.author?._id === user._id;

  useEffect(() => {
    (async () => {
      try {
        // const data = await getSingleGroup(id);
        setGroup(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteGroup(id);
        toast.success("Group deleted successfully");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <GroupSkeleton />;
  if (!group) return <p>Group not found</p>;

  return (
    <>
      <h1 className="text-center text-4xl">{group.name}</h1>
      <img
        src={group.image}
        alt={group.name}
        className="rounded-lg max-h-96 mx-auto"
      />
      <p>{group.description}</p>

      <ul className="mt-4">
        <li>
          <strong>Country:</strong> {group.country}
        </li>
        <li>
          <strong>Zip Code:</strong> {group.zipCode}
        </li>
        <li>
          <strong>System:</strong> {group.systems}
        </li>
        <li>
          <strong>Playstyle:</strong> {group.playstyles}
        </li>
        <li>
          <strong>Days:</strong> {group.weekdays.join(", ")}
        </li>
        <li>
          <strong>Frequency/Month:</strong> {group.frequencyPerMonth}
        </li>
        <li>
          <strong>Max Members:</strong> {group.maxMembers}
        </li>
        <li>
          <strong>Author:</strong> {group.author?.userName}
        </li>
      </ul>

      {isAuthor && (
        <div className="flex gap-2 mt-4">
          <button onClick={() => navigate(`/edit/${id}`)} className="btn">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-error">
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default Group;
