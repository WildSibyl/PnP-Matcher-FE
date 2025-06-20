import Addsvg from "../assets/add.svg?react";
import dragonImage from "../assets/dragonimage.png";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import GroupCard from "../components/cards/Groupcard";
import { getMyGroups, acceptInvite, rejectInvite } from "../data/user";
import { useEffect, useState } from "react";
import RenDie from "../assets/ren/Ren-die.png";
import { getSingleGroup } from "../data/groups";
import { toast } from "react-toastify";
import { me } from "../data/auth";

const Grouplist = () => {
  const { user, setUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [invites, setInvites] = useState([]);

  const refreshGroups = async () => {
    try {
      const data = await getMyGroups();
      setGroups(data);
    } catch (error) {
      //console.log("Error refreshing groups", error.message);
    }
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await me();
      setUser(updatedUser);
    } catch (error) {
      //console.log("Couldn't update user");
    }
  };

  useEffect(() => {
    // Get new user info on page mount
    refreshUser();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user || !Array.isArray(user.groups) || user.groups.length === 0) {
        //console.log("User not logged in");
        return;
      }
      try {
        const data = await getMyGroups();
        setGroups(data);
      } catch (error) {
        //console.log("Error fetching groups ", error.message);
      }
    };

    const fetchInvite = async (id) => {
      if (!id) {
        //console.log("Group not found");
        return;
      }
      try {
        const data = await getSingleGroup(id);
        //set Invites and make sure each invite is only displayed once
        setInvites((prev) => {
          if (prev.find((g) => g._id === data._id)) return prev;
          return [...prev, data];
        });
        //console.log("Fetched invite: ", data);
      } catch (error) {
        //console.log("Error fetching groups ", error.message);
      }
    };

    fetchGroups();

    //Await invites
    (async () => {
      if (user.invites?.length > 0) {
        for (const inviteId of user.invites) {
          await fetchInvite(inviteId);
        }
      }
    })();
  }, [user]);

  const handleAccept = async (id) => {
    if (!id) {
      //console.log("Not a valid id");
      return;
    }

    try {
      await acceptInvite(id);
      setInvites((prev) => prev.filter((g) => g._id !== id));

      toast("Invite accepted!", {
        theme: "light",
      });
      await refreshGroups();
      await refreshUser();
    } catch (error) {
      //console.log("Couldn't accept invite");
    }
  };

  const handleDecline = async (id) => {
    if (!id) {
      //console.log("Not a valid id");
      return;
    }

    try {
      await rejectInvite(id);
      setInvites((prev) => prev.filter((g) => g._id !== id));
      toast("Invite rejected!", {
        theme: "light",
      });
      await refreshGroups();
      await refreshUser();
    } catch (error) {
      //console.log("Couldn't reject invite");
    }
  };

  if (!user) return <p className="text-pnp-white">Loading user...</p>;

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
                  src={RenDie}
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
        to="/create-group"
        style={{ backgroundImage: `url(${dragonImage})` }}
        className="bg-center bg-cover w-[80vw] max-w-[500px] rounded-2xl items-center justify-center h-[8vh] text-pnp-white flex gap-2 mx-10 mt-5 mb-5"
      >
        <Addsvg />
        <h3>CREATE A NEW GROUP</h3>
      </Link>

      {user?.groups?.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mx-auto">
          {Array.isArray(groups) &&
            [...groups]
              .reverse()
              .map((e) => <GroupCard key={e._id} details={e} />)}
        </div>
      ) : (
        <>
          <h3 className="text-pnp-white mt-6">You currently have no groups!</h3>
          <img
            src={RenDie}
            alt="Ren Chat"
            className="w-[200px] h-[200px] object-contain mb-1"
          />
          <p className="text-pnp-white text-center">
            Find players or create your own group to start adventuring!
          </p>
        </>
      )}
    </div>
  );
};

export default Grouplist;
