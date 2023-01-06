import { Scale } from "./scales";

export interface NoteSettings {
    name: Note;
    octave: number;
    fret: number;
}

export enum Note {
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    A = "A",
    B = "B",
    // next majors
    AMajor = "A#",
    CMajor = "C#",
    DMajor = "D#",
    FMajor = "F#",
    GMajor = "G#",
    // next minors
    AMinor = "A♭",
    BMinor = "B♭",
    CMinor = "C♭",
    DMinor = "D♭",
    EMinor = "E♭",
    GMinor = "G♭",
}

export const NoteNames = {
    [Note.C]: "Do",
    [Note.D]: "Re",
    [Note.E]: "Mi",
    [Note.F]: "Fa",
    [Note.G]: "Sol",
    [Note.A]: "La",
    [Note.B]: "Si",
    // next majors
    [Note.AMajor]: "La Major",
    [Note.CMajor]: "Do Major",
    [Note.DMajor]: "Re Major",
    [Note.FMajor]: "Fa Major",
    [Note.GMajor]: "Sol Major",
    // next minors
    [Note.AMinor]: "La Minor",
    [Note.BMinor]: "Si Minor",
    [Note.CMinor]: "Do Minor",
    [Note.DMinor]: "Re Minor",
    [Note.EMinor]: "Mi Minor",
    [Note.GMinor]: "Sol Minor",
} as const;

const OpenNotes = new Set([Note.C, Note.D, Note.E, Note.F, Note.A, Note.G, Note.B]);
const MajorNotes = new Set([Note.CMajor, Note.DMajor, Note.FMajor, Note.GMajor, Note.AMajor]);
const MinorNotes = new Set([Note.CMinor, Note.DMinor, Note.EMinor, Note.GMinor, Note.AMinor, Note.BMinor]);

export const isOpen = (note: Note): boolean => OpenNotes.has(note);
export const isMajor = (note: Note): boolean => MajorNotes.has(note);
export const isMinor = (note: Note): boolean => MinorNotes.has(note);
export const notMajor = (note: Note): boolean => !isMajor(note);
export const notMinor = (note: Note): boolean => !isMinor(note);

/**
 * @param {Note} note
 * @param {number} fret
 * @param {Scale} scale
 */
export const getNoteFromFret = (note: Note, fret: number, scale: Scale): NoteSettings => {
    const octave = Math.floor(fret / 12);
    let lastNote = note;
    let count = fret;
    while (fret>0 && count--) {
        lastNote = scale[lastNote] as Note;
    }
    return { name: lastNote, octave, fret } as NoteSettings;
};
