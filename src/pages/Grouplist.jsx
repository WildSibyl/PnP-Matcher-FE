import { useNavigate } from "react-router";

import Addsvg from "../assets/add.svg?react";
import dragonImage from "../assets/dragonimage.png";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import GroupCard from "../components/cards/Groupcard";
import { getMyGroups, acceptInvite, rejectInvite } from "../data/user";
import { useEffect, useState } from "react";
import renimg from "../assets/ren/Ren-die.png";
import D20svg from "../assets/d20.svg?react";
import { getSingleGroup } from "../data/groups";
import { toast } from "react-toastify";

const Grouplist = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [invites, setInvites] = useState([]);
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  const refreshGroups = async () => {
    try {
      const data = await getMyGroups();
      setGroups(data);
    } catch (error) {
      console.log("Error refreshing groups", error.message);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user || !Array.isArray(user.groups) || user.groups.length === 0) {
        console.log("User not logged in");
        return;
      }
      try {
        const data = await getMyGroups();
        setGroups(data);
      } catch (error) {
        console.log("Error fetching groups ", error.message);
      }
    };

    const fetchInvite = async (id) => {
      if (!id) {
        console.log("Group not found");
        return;
      }
      try {
        const data = await getSingleGroup(id);
        //set Invites and make sure each invite is only displayed once
        setInvites((prev) => {
          if (prev.find((g) => g._id === data._id)) return prev;
          return [...prev, data];
        });
        console.log("Fetched invite: ", data);
      } catch (error) {
        console.log("Error fetching groups ", error.message);
      }
    };

    fetchGroups();
    Promise.all(user?.invites.map((e) => fetchInvite(e)));
  }, [user]);

  const handleAccept = async (id) => {
    if (!id) {
      console.log("Not a valid id");
      return;
    }

    try {
      await acceptInvite(id);
      setInvites((prev) => prev.filter((g) => g._id !== id));
      toast("Invite accepted!", {
        theme: "light",
      });
      await refreshGroups();
    } catch (error) {
      console.log("Couldn't accept invite");
    }
  };

  const handleDecline = async (id) => {
    if (!id) {
      console.log("Not a valid id");
      return;
    }

    try {
      await rejectInvite(id);
      setInvites((prev) => prev.filter((g) => g._id !== id));
      toast("Invite rejected!", {
        theme: "light",
      });
      await refreshGroups();
    } catch (error) {
      console.log("Couldn't reject invite");
    }
  };

  if (!user) return <p>Loading user...</p>;

  if (!user.groups?.length) {
    console.log("User not logged in or has no groups");
    return;
  }

  return (
    <div className="flex flex-col w-full max-w-[100vw] items-center justify-center gap-4">
      <h2 className="text-pnp-white uppercase">Your groups</h2>

      {/* INVITE LIST */}
      {invites.length > 0 && (
        <div className="flex flex-col mx-auto w-[95vw] min-w-[350px] max-w-[520px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl">
          {/* Header mit Ren */}
          <div className="flex w-full min-h-[20vh]">
            <div className="flex pl-4 pt-4">
              <div className="w-4/5 ">
                <p className="text-2xl font-extrabold text-pnp-white pt-4">
                  You got invites!
                </p>
                <p className="text-pnp-white pb-2">
                  Someone invited you to join their group! Are you ready for new
                  adventures?
                </p>
              </div>
              <div className="w-2/5 relative flex justify-end items-end overflow-hidden">
                <img
                  src={renimg}
                  alt="Ren, our mascot"
                  className="absolute mx-auto w-auto max-h-[100%] bottom-0 translate-y-2"
                />
              </div>
            </div>
          </div>
          {invites?.map((e) => (
            <div className="flex justify-between px-4 py-3 items-center bg-pnp-white text-pnp-black w-[95%] rounded-2xl pnp-shadow mx-auto mb-2">
              <div className="flex flex-col">
                <h3>{e.name}</h3>
                <p>Invited by: {e.author.userName}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn-primary-light"
                  onClick={() => handleAccept(e._id)}
                >
                  Accept
                </button>
                <button
                  className="btn-secondary-dark"
                  onClick={() => handleDecline(e._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* INVITE LIST END */}

      <Link
        to="/search"
        style={{ backgroundImage: `url(${dragonImage})` }}
        className="bg-center bg-cover w-[80vw] max-w-[500px] rounded-2xl items-center justify-center h-[8vh] text-pnp-white flex gap-2 mx-10 mt-5 mb-5"
      >
        <Addsvg />
        <h3>CREATE A NEW GROUP</h3>
      </Link>
      <div className="flex flex-col items-center justify-center gap-4 mx-auto">
        {Array.isArray(groups) &&
          groups.map((e) => <GroupCard key={e._id} details={e} />)}
      </div>
      <button onClick={handleCreateGroup} className="btn-primary-light">
        Create Group
      </button>
    </div>
  );
};

export default Grouplist;
