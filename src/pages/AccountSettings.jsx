import CharCountInput from "../components/edit-comp/CharCountInput";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateEmail, updatePassword, deleteAccount } from "../data/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "../data/auth";

const AccountSettings = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const userEmail = user?.email || "";

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!user || !domain) return "";
    return `${user[0]}***@${domain}`;
  };

  const [emailForm, setEmailForm] = useState({
    email: userEmail,
    newEmail: "",
    currentPassword: "",
    confirmNewEmail: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [deleteForm, setDeleteForm] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setEmailForm({
      email: userEmail,
      newEmail: "",
      currentPassword: "",
      confirmNewEmail: "",
    });
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleCancelDelete = () => {
    setIsDeletingAccount(false);
    setDeleteForm({
      email: "",
      password: "",
    });
  };

  const handleUpdateEmail = async () => {
    const { newEmail, confirmNewEmail, currentPassword } = emailForm;
    try {
      await updateEmail({ newEmail, confirmNewEmail, currentPassword });
      toast.success("Email updated!");

      // Reset fields
      setEmailForm({
        newEmail: "",
        confirmNewEmail: "",
        currentPassword: "",
      });

      setIsEditingEmail(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(passwordForm);
      toast.success("Password updated!");

      // Reset fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setIsEditingPassword(false);
    } catch (err) {
      toast.error(err.message);
    }
    console.log("Updating password", passwordForm);
    setIsEditingPassword(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(deleteForm); // you’ll implement this in your API layer
      toast.success("Account deleted");

      // Reset fields
      setDeleteForm({
        email: "",
        password: "",
      });

      signOut();
      setUser(null);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col gap-10">
      {/* EMAIL */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg text-pnp-black font-bold mb-4">Email</h2>
        {!isEditingEmail ? (
          <div className="flex justify-between items-center">
            <p>{maskEmail(emailForm.email)}</p>
            <button
              onClick={() => setIsEditingEmail(true)}
              className="text-pnp-darkpurple font-semibold"
            >
              Edit
            </button>
          </div>
        ) : (
          <>
            <CharCountInput
              name="newEmail"
              type="email"
              value={emailForm.newEmail}
              onChange={handleEmailChange}
              maxLength={250}
              placeholder="New Email"
              label="NEW EMAIL"
            />
            <CharCountInput
              name="confirmNewEmail"
              type="email"
              value={emailForm.confirmNewEmail}
              onChange={handleEmailChange}
              maxLength={250}
              placeholder="Confirm New Email"
              label="CONFIRM EMAIL"
            />
            <CharCountInput
              name="currentPassword"
              type="password"
              value={emailForm.currentPassword}
              onChange={handleEmailChange}
              maxLength={250}
              placeholder="Current Password"
              label="CURRENT PASSWORD"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdateEmail}
                className="bg-pnp-darkpurple text-white px-4 py-2 rounded-xl"
              >
                Save
              </button>
              <button
                onClick={handleCancelEmail}
                className="text-gray-500 font-medium"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* PASSWORD */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Password</h2>
        {!isEditingPassword ? (
          <div className="flex justify-between items-center">
            <p>•••••••••••••••</p>
            <button
              onClick={() => setIsEditingPassword(true)}
              className="text-pnp-darkpurple font-semibold"
            >
              Edit
            </button>
          </div>
        ) : (
          <>
            <CharCountInput
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              maxLength={250}
              placeholder="Current Password"
              label="CURRENT PASSWORD"
            />
            <CharCountInput
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              maxLength={250}
              placeholder="New Password"
              label="NEW PASSWORD"
            />
            <CharCountInput
              name="confirmNewPassword"
              type="password"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              maxLength={250}
              placeholder="Confirm New Password"
              label="CONFIRM PASSWORD"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdatePassword}
                className="bg-pnp-darkpurple text-white px-4 py-2 rounded-xl"
              >
                Save
              </button>
              <button
                onClick={handleCancelPassword}
                className="text-gray-500 font-medium"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      {/* DELETE ACCOUNT */}
      <div
        className={`p-6 rounded-2xl shadow-md ${
          isDeletingAccount ? "bg-red-100 border border-red-400" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 text-red-700">Delete Account</h2>
        {!isDeletingAccount ? (
          <div className="flex justify-between items-center">
            <p className="text-red-700">Permanently remove your account</p>
            <button
              onClick={() => setIsDeletingAccount(true)}
              className="text-red-700 font-semibold"
            >
              Delete
            </button>
          </div>
        ) : (
          <>
            <CharCountInput
              name="email"
              type="text"
              value={deleteForm.email}
              onChange={handleDeleteChange}
              maxLength={250}
              placeholder="Enter your e-mail"
              label="E-MAIL"
            />
            <CharCountInput
              name="password"
              type="password"
              value={deleteForm.password}
              onChange={handleDeleteChange}
              maxLength={250}
              placeholder="Enter your password"
              label="PASSWORD"
            />
            <p className="text-red-700">
              By clicking the button below you will permanently delete your
              account! No take-backsies!
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Confirm Account Deletion
              </button>
              <button
                onClick={handleCancelDelete}
                className="text-gray-500 font-medium"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
