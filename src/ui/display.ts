import { html } from "htm/preact/standalone";

export default ({ update }) => {
  const items = {
    major: true,
    minor: true,
    fret: true,
    note: true
  }
  const onChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    items[input.value] = input.checked as boolean;
    if (typeof update === "function") {
      update(items);
    }
  }

  const render = () => html`
  <div>
    <legend>Display</legend>
    <label>
      <input type="checkbox" onChange=${onChange} checked value="note" />Notes
    </label>
    <label>
      <input type="checkbox" onChange=${onChange} checked value="fret" />Fret number
    </label>
    <label>
      <input type="checkbox" onChange=${onChange} checked value="major" />Major notes 
    </label>
    <label>
      <input type="checkbox" onChange=${onChange} checked value="minor" />Minor notes 
    </label>
  </div>`;

  return { render, items }
}
