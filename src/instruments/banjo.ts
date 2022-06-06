import { IString, IInstrumentSettings } from "../instrument.ui.js";
import { Notes } from "../notes.js";
const GTunningString1: IString = { tune: Notes.D, octave: 1 };
const GTunningString2: IString = { tune: Notes.B, octave: 1 };
const GTunningString3: IString = { tune: Notes.G, octave: 1 };
const GTunningString4: IString = { tune: Notes.D, octave: 1 };
//const GTunningString5: Cord = { tune: Notes.G, octave: 2 };

const settings: IInstrumentSettings = {
	name: "Banjo G tune",
	frets: 22,
	strings: [
		//	GTunningString5,
		GTunningString1,
		GTunningString2,
		GTunningString3,
		GTunningString4,
	],
} as IInstrumentSettings;

export default settings;
