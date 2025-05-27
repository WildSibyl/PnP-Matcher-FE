const PlayerAvatar = () => {
  // Fetch random avatar from the API

  return (
    <div className="h-[100px] w-[100px] rounded-full border-6 border-white overflow-hidden">
      <img src={avatarPic} alt="random avatar" />
    </div>
  );
};

export default PlayerAvatar;
