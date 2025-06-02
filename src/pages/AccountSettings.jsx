import CharCountInput from "../components/edit-comp/CharCountInput";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateEmail, updatePassword } from "../data/auth";

const AccountSettings = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const { user } = useAuth();

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

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
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

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(emailForm);
      toast.success("Email updated!");
      setIsEditingEmail(false);
    } catch (err) {
      toast.error(err.message);
    }
    console.log("Updating email", emailForm);
    setIsEditingEmail(false);
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(passwordForm);
      toast.success("Password updated!");
      setIsEditingPassword(false);
    } catch (err) {
      toast.error(err.message);
    }
    console.log("Updating password", passwordForm);
    setIsEditingPassword(false);
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
    </div>
  );
};

export default AccountSettings;
