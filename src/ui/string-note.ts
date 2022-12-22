import { isMajor, isMinor, Notes, NotesScale, isOpen } from "../notes";
import { NoteSettings } from "./instrument";
import { render, html } from "htm/preact/standalone";

// export type StringArgs = {
// 	string: NoteSettings;
// 	fret: number;
// 	position: number;
// 	// onPress(config: StringNote): void;
// 	// onRelease(config: StringNote): void;
// }

// // export interface StringNote {
// // 	fret: number;
// // 	position: number;
// // 	note: NoteSettings;
// // 	release(): void;
// // 	press(): void;
// // }

// // filter open/major
// const filterNotMinor = (note: Notes) => !isMinor(note);

// /**
//  * Creates new Cord UI Element
//  * @param {StringArgs} stringSettings
//  * @returns {StringNote}
//  */
// const CreateStringNote = (stringSettings: StringArgs) => {
//   return html`<h1>banjo</h1>`;
// };

// export default CreateStringNote;
