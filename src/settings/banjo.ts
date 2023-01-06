import { InstrumentSettings } from "../ui/instrument";
import { NoteSettings, Note, MajorScale } from "../notes";

const GTunningString1: NoteSettings = { name: Note.D, fret: 1, octave: 1 };
const GTunningString2: NoteSettings = { name: Note.B, fret: 1, octave: 1 };
const GTunningString3: NoteSettings = { name: Note.G, fret: 1, octave: 1 };
const GTunningString4: NoteSettings = { name: Note.D, fret: 1, octave: 1 };
//const GTunningString5: IString = { tune: ENotes.D, octave: 1 };

export default {
    name: "Banjo G tune",
    frets: 22, //22
    scale: MajorScale,
    strings: [GTunningString1, GTunningString2, GTunningString3, GTunningString4],
    armBullets: [3, 5, 7, 10, 12, 15, 17],
} as InstrumentSettings;
