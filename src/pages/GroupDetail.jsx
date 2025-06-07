import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getSingleGroup } from "../data/groups";
import Loader from "../components/Loader";
import { useInviteModal } from "../context/InviteModalContextProvider";
import ChatModal from "../components/chat-comp/ChatModal";
import Part1Left from "../components/groupdetail-comp/Part1Left";
import Part2Right from "../components/groupdetail-comp/Part2Right";

const GroupDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupDetails, setGroupDetails] = useState(null);
  const [editedGroup, setEditedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Chat modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const chatUsername = groupDetails?.author?.userName || "Unknown User";

  const { openInviteModal } = useInviteModal();

  const openChat = (receiverId) => {
    setSelectedChatId(receiverId);
    setIsModalOpen(true);
  };

  const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSingleGroup(id);
        setGroupDetails(data);
        setEditedGroup({
          ...data,
          playstyles: data.playstyles || [],
          systems: data.systems || [],
          likes: data.likes || [],
          dislikes: data.dislikes || [],
          experience: data.experience || "",
          weekdays: data.weekdays || [],
        });
      } catch (err) {
        console.error("Error fetching group:", err);
        setError("Failed to load group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isAuthor =
    user && groupDetails?.author && groupDetails.author._id === user._id;

  const handleSave = async () => {
    try {
      const updateData = {
        name: editedGroup.name,
        tagline: editedGroup.tagline,
        description: editedGroup.description,
        experience: editedGroup.experience?.id || editedGroup.experience,
        playingModes: editedGroup.playingModes?.id || editedGroup.playingModes,
        systems: editedGroup.systems?.map((s) => s.id || s) ?? [],
        playstyles: editedGroup.playstyles?.map((p) => p.id || p) ?? [],
        likes: editedGroup.likes?.map((l) => l.id || l) ?? [],
        dislikes: editedGroup.dislikes?.map((d) => d.id || d) ?? [],
        frequencyPerMonth: editedGroup.frequencyPerMonth,
        languages:
          editedGroup.languages?.map((language) => language.id || language) ??
          [],
        weekdays: editedGroup.weekdays,
        address: {
          ...editedGroup.address,
        },
        image: editedGroup.image,
      };

      const res = await fetch(`${API_URL}/groups/${editedGroup._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error("Failed to update group");
      const updated = await res.json();
      setGroupDetails(updated);
      setEditedGroup(updated);
      setIsEditing(false);
      setPreviewImage(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCancel = () => {
    setEditedGroup(groupDetails);
    setIsEditing(false);
    setPreviewImage(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setPreviewImage(data.fileUrl);
        setEditedGroup((prev) => ({ ...prev, image: data.fileUrl }));
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-pnp-white text-center py-8">{error}</p>;
  if (!groupDetails)
    return (
      <p className="text-pnp-white text-center py-8">
        No group found with this ID.
      </p>
    );

  return (
    <>
      <div className="min-h-screen md:p-8 text-pnp-white">
        <div className="relative max-w-7xl mx-auto bg-pnp-white text-pnp-black rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-6 text-gray-600 hover:text-pnp-black text-xl cursor-pointer"
          >
            ✕
          </button>
          <div className="flex flex-col lg:flex-row">
            <Part1Left
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editedGroup={editedGroup}
              setEditedGroup={setEditedGroup}
              groupDetails={groupDetails}
              isAuthor={isAuthor}
              openInviteModal={openInviteModal}
              openChat={() => openChat(groupDetails.author._id)}
              previewImage={previewImage}
              handleImageUpload={handleImageUpload}
            />

            <Part2Right
              isEditing={isEditing}
              editedGroup={editedGroup}
              setEditedGroup={setEditedGroup}
              groupDetails={groupDetails}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {isAuthor && isEditing && (
            <div className="flex gap-4 m-4 self-center">
              <button onClick={handleSave} className="btn-primary-dark">
                Save
              </button>
              <button
                onClick={handleCancel}
                className="btn-primary-dark bg-gray-300 text-pnp-black"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        receiverId={selectedChatId}
        username={chatUsername}
      />
    </>
  );
};

export default GroupDetail;
