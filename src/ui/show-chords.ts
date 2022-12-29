import { html } from "htm/preact/standalone";

export default (props) => {
  let notes = {};
  const render = () => html`
  <div>
    <legend>Chords</legend>
    <span>${getNotes()}</span>
  </div>`;

  const getNotes = () => {
    return Object.keys(notes).reduce((list, key) => {
      list.push(notes[key])
      return list;
    }, []).join(",");
  }
  const update = (pressedNotes) => { notes = pressedNotes; }

  return { render, update }
}
