const PlayerAvatar = ({ avatar }) => {
  return (
    <div className="h-[100px] w-[100px] rounded-full border-6 border-pnp-white overflow-hidden shrink-0">
      <img
        src={avatar}
        alt="random avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PlayerAvatar;
