// import CreateStringNote, { StringArgs, StringNote } from "./string-note.ts";
import { html } from "htm/preact/standalone";
import { Scales, NoteSettings, getNoteFromFret, isMajor, isMinor } from "../notes";

export interface InstrumentSettings {
  name: string;
  frets: number;
  scale: Scales;
  strings: NoteSettings[];
  onChange: Function;
  armBullets: number[];
}

const getAllNotes = (strings: NoteSettings[], frets: number, scale: Scales) => {
  return strings.map((noteSetting: NoteSettings) => {
    let fret = 0;
    const stringNotes = [];
    while (fret <= frets) {
      stringNotes.push(getNoteFromFret(noteSetting.name, fret, scale));
      fret += 1;
    }
    return stringNotes;
  });
};

const Instrument = (settings: InstrumentSettings) => {
  const notesGrid = getAllNotes(
    settings.strings,
    settings.frets,
    settings.scale
  );
  const allNotes = notesGrid
    .reverse()
    .map(
      (notes: NoteSettings[], index) =>
        html`<div class="string">
          ${notes.map(
          (note: NoteSettings) =>
            html`<button 
                data-fret="${note.fret}" 
                data-string="${notesGrid.length - index}" 
                data-minor="${isMinor(note.name)}" 
                data-major="${isMajor(note.name)}" 
                aria-pressed="false"
                class="note"
              >
                <span>${note.name}</span>
              </button>`
        )}
        </div>`
    );
  const render = () => {
    return html`<div class="arm">${allNotes}</div>`;
  }
  return { render }
};

export default Instrument;
