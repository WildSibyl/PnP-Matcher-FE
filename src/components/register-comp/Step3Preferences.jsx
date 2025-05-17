import Select from "react-select";
import {
  playstylesPreference,
  likesPreference,
  dislikesPreference,
} from "../../data/dropdowns/preferences";

const Step3Preferences = ({ form, setMultiSelect }) => (
  <>
    <label className="label mt-4">Playstyle</label>
    <Select
      options={playstylesPreference}
      isMulti
      value={playstylesPreference.filter((p) =>
        form.playstyles.includes(p.value)
      )}
      onChange={(selected) => setMultiSelect("playstyles", selected)}
      placeholder="Select playstyles"
    />
    <div className="mt-2 flex flex-wrap gap-2">
      {form.playstyles.map((val) => (
        <span key={val} className="bg-gray-200 px-2 py-1 rounded">
          {val}
        </span>
      ))}
    </div>

    <label className="label mt-4">Preferences (Likes)</label>
    <Select
      options={likesPreference}
      isMulti
      value={likesPreference.filter((l) => form.likes.includes(l.value))}
      onChange={(selected) => setMultiSelect("likes", selected)}
      placeholder="Select likes"
    />

    <label className="label mt-4">NO-GOs (Dislikes)</label>
    <Select
      options={dislikesPreference}
      isMulti
      value={dislikesPreference.filter((d) => form.dislikes.includes(d.value))}
      onChange={(selected) => setMultiSelect("dislikes", selected)}
      placeholder="Select dislikes"
    />
  </>
);

export default Step3Preferences;
