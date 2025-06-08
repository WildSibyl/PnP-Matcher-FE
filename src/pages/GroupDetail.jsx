import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  getSingleGroup,
  updateGroup,
  postGroupImage,
  deleteGroup,
} from "../data/groups";
import Loader from "../components/Loader";
import { useInviteModal } from "../context/InviteModalContextProvider";
import ChatModal from "../components/chat-comp/ChatModal";
import Part1Left from "../components/groupdetail-comp/Part1Left";
import Part2Right from "../components/groupdetail-comp/Part2Right";
import GroupDeleteModal from "../components/groupdetail-comp/GroupDeleteModal";
import { toast } from "react-toastify";

const GroupDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupDetails, setGroupDetails] = useState(null);
  const [editedGroupForm, setEditedGroupForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Chat modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const chatUsername = groupDetails?.author?.userName || "Unknown User";

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { openInviteModal } = useInviteModal();

  const openChat = (receiverId) => {
    setSelectedChatId(receiverId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSingleGroup(id);
        console.log("Fetched group data:", data);
        setGroupDetails(data);
        const groupForm = {
          ...data,
          image: data.image || "",
          address: data.address || {
            street: "",
            houseNumber: "",
            postalCode: "",
            city: "",
          },
          playingModes: data.playingModes || null,
          experience: data.experience?._id || "", // normalizing fetched data
          systems: data.systems?.map((s) => s._id) || [], //normalizing fetched data
          weekdays: data.weekdays || [],
          languages: data.languages || [],
          playstyles: data.playstyles || [],
          likes: data.likes?.map((l) => l._id) || [], //normalizing fetched data
          dislikes: data.dislikes?.map((d) => d._id) || [], //normalizing fetched data
        };
        setEditedGroupForm(groupForm);
        console.log("Initial group form:", groupForm);
      } catch (err) {
        console.error("Error fetching group:", err);
        setError("Failed to load group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isAuthor = user && groupDetails?.author?._id === user._id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setEditedGroupForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      return;
    }

    if (name === "weekdays") {
      let newDays = [...groupForm.weekdays];
      if (checked) {
        if (!newDays.includes(value)) newDays.push(value);
      } else {
        newDays = newDays.filter((day) => day !== value);
      }
      setEditedGroupForm((prev) => ({ ...prev, weekdays: newDays }));
    } else if (type === "number") {
      setEditedGroupForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setEditedGroupForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Cleaned up handleSave uses the editedGroupForm state
  const handleSave = async () => {
    if (!editedGroupForm) return;

    const { location, ...addressWithoutLocation } =
      editedGroupForm.address || {};

    try {
      const payload = {
        author:
          typeof editedGroupForm.author === "string"
            ? editedGroupForm.author
            : editedGroupForm.author?._id,
        name: editedGroupForm.name,
        image: editedGroupForm.image,
        address: {
          ...addressWithoutLocation,
        },
        experience: editedGroupForm.experience,
        systems: editedGroupForm.systems.map((s) =>
          typeof s === "string" ? s : s.id
        ),
        weekdays: editedGroupForm.weekdays,
        frequencyPerMonth: editedGroupForm.frequencyPerMonth,
        playingModes:
          typeof editedGroupForm.playingModes === "string"
            ? editedGroupForm.playingModes
            : editedGroupForm.playingModes?._id || null,
        languages: editedGroupForm.languages.map((l) =>
          typeof l === "string" ? l : l.id
        ),
        playstyles: editedGroupForm.playstyles.map((p) =>
          typeof p === "string" ? p : p.id
        ),
        likes: editedGroupForm.likes.map((l) =>
          typeof l === "string" ? l : l.id
        ),
        dislikes: editedGroupForm.dislikes.map((d) =>
          typeof d === "string" ? d : d.id
        ),
        tagline: editedGroupForm.tagline,
        description: editedGroupForm.description,
        members: editedGroupForm.members,
        maxMembers: editedGroupForm.maxMembers,
      };
      console.log("Saving group with payload:", payload);
      const res = await updateGroup(id, payload);

      setGroupDetails(res);
      setEditedGroupForm(res);
      setIsEditing(false);
      setPreviewImage(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCancel = () => {
    setEditedGroupForm(groupDetails);
    setIsEditing(false);
    setPreviewImage(null);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    toast.success("Group deleted. More time for the next adventure!");
    navigate("/groups");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await postGroupImage(formData);
      setPreviewImage(data.fileUrl);
      setEditedGroupForm((prev) => ({ ...prev, image: data.fileUrl }));
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
              editedGroup={editedGroupForm}
              setEditedGroup={setEditedGroupForm}
              groupDetails={groupDetails}
              isAuthor={isAuthor}
              onChange={handleChange}
              openInviteModal={openInviteModal}
              openChat={() => openChat(groupDetails.author._id)}
              previewImage={previewImage}
              handleImageUpload={handleImageUpload}
            />

            <Part2Right
              isEditing={isEditing}
              editedGroup={editedGroupForm}
              setEditedGroup={setEditedGroupForm}
              groupDetails={groupDetails}
              isAuthor={isAuthor}
              onChange={handleChange}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {isAuthor && isEditing && (
            <div className="flex gap-4 m-4 self-center">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn-primary-dark bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary-dark text-pnp-black"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary-dark">
                Save
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
      {showDeleteModal && (
        <GroupDeleteModal
          groupId={id}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default GroupDetail;
