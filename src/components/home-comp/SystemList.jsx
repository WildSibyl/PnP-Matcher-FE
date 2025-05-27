import { famousSystems } from "../../data/mockHomeData";

const SystemList = () => {
  // Pick the first 9 for display
  const tags = famousSystems.slice(0, 100);

  // Split into rows
  const row1 = tags.slice(0, 50);
  const row2 = tags.slice(50, 100);

  return (
    <div className="tag-grid space-y-2">
      <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto">
        {row1.map((tag, index) => (
          <div
            className="bg-pnp-purple px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
            key={`row1-${index}`}
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto">
        {row2.map((tag, index) => (
          <div
            className="bg-pnp-purple px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
            key={`row2-${index}`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemList;
