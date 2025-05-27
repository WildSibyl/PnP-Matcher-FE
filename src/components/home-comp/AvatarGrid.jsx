import PlayerAvatar from "./PlayerAvatar";

const Avatargrid = ({ avatars }) => {
  return (
    <div className="avatar-grid">
      {avatars.map((avatar, index) => (
        <div key={index} className="avatar-item">
          <img src={avatar.image} alt={avatar.name} className="avatar-image" />

          <div className="avatar-name">{avatar.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Avatargrid;
