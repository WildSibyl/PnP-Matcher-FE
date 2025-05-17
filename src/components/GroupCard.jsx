import { Link } from "react-router-dom";

const GroupCard = ({
  _id,
  name,
  description,
  image,
  country,
  zipCode,
  system,
  playstyle,
  days,
  frequencyPerMonth,
  maxMembers,
  author,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="bg-white h-48">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </figure>
      <div className="card-body h-72 flex flex-col justify-between">
        <div>
          <h2 className="card-title">{name}</h2>
          <p className="truncate text-wrap">{description}</p>
        </div>
        <ul className="text-sm mt-2 space-y-1">
          <li>
            <strong>Country:</strong> {country}
          </li>
          <li>
            <strong>Zip Code:</strong> {zipCode}
          </li>
          <li>
            <strong>System:</strong> {system}
          </li>
          <li>
            <strong>Playstyle:</strong> {playstyle}
          </li>
          <li>
            <strong>Days:</strong> {days?.join(", ")}
          </li>
          <li>
            <strong>Frequency/Month:</strong> {frequencyPerMonth}
          </li>
          <li>
            <strong>Max Members:</strong> {maxMembers}
          </li>
          <li>
            <strong>Author:</strong> {author?.userName || "Unknown"}
          </li>
        </ul>
        <div className="mt-4">
          <Link to={`/group/${_id}`} className="btn btn-primary w-full">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
