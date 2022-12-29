// import CreateStringNote, { StringArgs, StringNote } from "./string-note.ts";
import { html } from "htm/preact/standalone";
import { Scales, NoteSettings, getNoteFromFret, isMajor, isMinor } from "../notes";

export interface InstrumentSettings {
  name: string;
  frets: number;
  scale: Scales;
  strings: NoteSettings[];
  keyPress?: Function;
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
  const buttonPressed: Record<string, undefined | HTMLButtonElement> = settings.strings.reduce((pressedMap, _, index) => {
    pressedMap[(index + 1).toString()] = undefined;
    return pressedMap;
  }, {})

  const notesPressed: Record<string, undefined | string> = settings.strings.reduce((pressedMap, _, index) => {
    pressedMap[(index + 1).toString()] = undefined;
    return pressedMap;
  }, {})

  const toggleString = ({ position, fret, note }) => (event: Event) => {
    const pos = position.toString();
    const button = event.currentTarget as HTMLButtonElement;
    const lastButton = buttonPressed[pos] as HTMLButtonElement;

    if (lastButton) {
      lastButton.setAttribute("aria-pressed", "false");
    }

    if (button === lastButton) {
      buttonPressed[pos] = undefined;
      notesPressed[pos] = undefined
    }
    else {
      buttonPressed[pos] = button;
      notesPressed[pos] = button.getAttribute("data-note");
      button.setAttribute("aria-pressed", "true");
    }

    if (settings.keyPress) {
      settings.keyPress(notesPressed)
    }
  }

  const allNotes = notesGrid
    .reverse()
    .map(
      (notes: NoteSettings[], index) =>
        html`<div class="string">
          ${notes.map(
          (note: NoteSettings) => {
            const position = notesGrid.length - index;
            return html`
          <button 
            data-fret="${note.fret}" 
            data-position="${position}" 
            data-minor="${isMinor(note.name)}" 
            data-major="${isMajor(note.name)}" 
            data-note="${note.name}" 
            aria-pressed="false"
            onClick=${toggleString({ position, fret: note.fret, note: note.name })}
            class="note"
          >
            <span>${note.name}</span>
          </button>`
          }
        )}
        </div>`
    );
  const render = () => {
    return html`<div class="arm">${allNotes}</div>`;
  }
  return { render }
};

export default Instrument;
