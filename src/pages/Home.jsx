import Chip from "../components/Chip";

const Home = () => {
  return (
    <div>
      <a>HOME</a>
      <Chip color="green" icon="dice" text="Player" />
      <Chip color="purple" text="GM" />
    </div>
  );
};

export default Home;
