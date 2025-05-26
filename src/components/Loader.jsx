import LoadBook from "../assets/loading/load-book.svg?react";
import LoadDice from "../assets/loading/load-dice.svg?react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="book">
        <LoadBook style={{ width: "60px" }} />
      </div>

      <LoadDice style={{ width: "30px" }} />
      <LoadDice style={{ width: "25px" }} />
      <LoadDice style={{ width: "20px" }} />
    </div>
  );
};

export default Loader;
