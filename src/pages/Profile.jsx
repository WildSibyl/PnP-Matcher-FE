import react from "react";
import PlayerDetail from "../components/PlayerDetail";
//import PlayerDetailMock_data from "../Mock_data/PlayerDetailMock_data";

const Profile = () => {
  const mockUser = {
    name: "Player 1",
    quote: "Gaming is life!",
    location: "21073 Hamburg",
    age: 35,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    roles: ["Player", "Game Master", "Rookie"],
    availability: "2x per month",
    weekdays: ["MO", "WE"],
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia nunc sed sapien ullamcorper, quis congue sapien pulvinar. Nulla facilisi. Pellentesque porttitor porta ligula nec facilisis. Vestibulum in quam nisl. Sed non ante sed lorem finibus rutrum ut sit amet odio. Phasellus gravida rutrum orci, id pharetra tortor faucibus et. Duis dictum, odio eget hendrerit gravida, tortor justo posuere ex, ac lacinia ligula justo ac eros. Vestibulum lacinia, leo sed sagittis mattis, arcu lacus viverra velit, a feugiat magna nulla a libero.`,
    languages: [
      "https://flagcdn.com/w80/de.png",
      "https://flagcdn.com/w80/fr.png",
    ],
    playstyles: ["Power Gamer", "Tactician", "Butt-Kicker"],
    gameSystems: ["DnD 5E", "Call of Cthulhu", "7th Sea"],
    likes: ["Roleplay", "Teamwork", "Story-driven"],
    dislikes: ["Rules lawyers", "Powergaming", "No-shows"],
  };
  return <PlayerDetail user={mockUser} />;
};

// return (
//   <>
//     <a>PROFILE</a>

//   </>
// );

export default Profile;
