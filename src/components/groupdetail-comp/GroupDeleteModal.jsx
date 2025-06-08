import { deleteGroup } from "../../data/groups";

const GroupDeleteModal = ({ groupId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteGroup(groupId);
      onDelete();
      // no need for onClose() here because onDelete calls setShowDeleteModal(false)
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-pnp-black/70 flex justify-center items-center z-50"
      onClick={onClose} // clicking on backdrop closes modal
    >
      <div
        className="bg-pnp-white rounded-lg p-6 max-w-md w-full shadow-lg flex flex-col justify-center items-center mx-5"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p>This will banish this group to the void.</p>
        <p className="mb-6">There will be no coming back.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn-secondary-dark text-pnp-black"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="btn-primary-dark bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
