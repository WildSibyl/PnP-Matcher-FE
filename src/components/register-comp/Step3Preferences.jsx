import Select from "react-select";
import {
  playstylesPreference,
  likesPreference,
  dislikesPreference,
} from "../../data/dropdowns/preferences";

const Step3Preferences = ({ form, setMultiSelect }) => (
  <>
    <h3 className="title">YOU AS A PLAYER 2</h3>
    <div className="flex flex-row justify-between">
      <label className="label">PLAYSTYLE</label>
      <p className="label-italic">Which playstyles fit you the most?</p>
    </div>
    <Select
      options={playstylesPreference}
      isMulti
      value={playstylesPreference.filter((p) =>
        form.playstyles.includes(p.value)
      )}
      onChange={(selected) => setMultiSelect("playstyles", selected)}
      placeholder="Select playstyles"
      className="input-bordered-multi"
    />
    <div className="tag-field">
      {form.playstyles.map((val) => (
        <span key={val} className="bg-black text-white px-2 py-1 rounded-full">
          {val}
        </span>
      ))}
    </div>

    <div className="flex flex-row justify-between">
      <label className="label">PREFERENCES</label>
      <p className="label-italic">Stuff you like</p>
    </div>
    <Select
      options={likesPreference}
      isMulti
      value={likesPreference.filter((l) => form.likes.includes(l.value))}
      onChange={(selected) => setMultiSelect("likes", selected)}
      placeholder="Select likes"
      className="input-bordered-multi"
    />
    <div className="tag-field">
      {form.likes.map((val) => (
        <span key={val} className="bg-black text-white px-2 py-1 rounded-full">
          {val}
        </span>
      ))}
    </div>

    <div className="flex flex-row justify-between">
      <label className="label">NO-GOs</label>
      <p className="label-italic">Stuff you dislike</p>
    </div>
    <Select
      options={dislikesPreference}
      isMulti
      value={dislikesPreference.filter((d) => form.dislikes.includes(d.value))}
      onChange={(selected) => setMultiSelect("dislikes", selected)}
      placeholder="Select dislikes"
      className="input-bordered-multi"
    />
    <div className="tag-field">
      {form.dislikes.map((val) => (
        <span key={val} className="bg-black text-white px-2 py-1 rounded-full">
          {val}
        </span>
      ))}
    </div>
  </>
);

export default Step3Preferences;
