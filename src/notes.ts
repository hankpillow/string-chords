type TypeScale = Record<string, string>;

export enum Note {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G", // next majors
    AMajor = "A#",
    CMajor = "C#",
    DMajor = "D#",
    FMajor = "F#",
    GMajor = "G#", // next minors
    AMinor = "A♭",
    BMinor = "B♭",
    CMinor = "C♭",
    DMinor = "D♭",
    EMinor = "E♭",
    GMinor = "G♭",
}
export const DefaultNotes = new Set([Note.C, Note.D, Note.E, Note.F, Note.A, Note.G, Note.B]);
export const MajorNotes = new Set([Note.CMajor, Note.DMajor, Note.FMajor, Note.GMajor, Note.AMajor]);
export const MinorNotes = new Set([Note.DMinor, Note.EMinor, Note.GMinor, Note.AMinor, Note.BMinor]);
export const NotesNames: TypeScale = {
    [Note.A]: "La",
    [Note.B]: "Si",
    [Note.C]: "Do",
    [Note.D]: "Re",
    [Note.E]: "Mi",
    [Note.F]: "Fa",
    [Note.G]: "Sol", // next majors
    [Note.AMajor]: "La Major",
    [Note.CMajor]: "Do Major",
    [Note.DMajor]: "Re Major",
    [Note.FMajor]: "Fa Major",
    [Note.GMajor]: "Sol Major", // next minors
    [Note.AMinor]: "La Minor",
    [Note.BMinor]: "Si Minor",
    [Note.CMinor]: "Do Minor",
    [Note.DMinor]: "Re Minor",
    [Note.EMinor]: "Mi Minor",
    [Note.GMinor]: "Sol Minor",
} as const;

export const MajorScale: TypeScale = {
    [Note.C]: Note.CMajor,
    [Note.CMajor]: Note.D,
    [Note.D]: Note.DMajor,
    [Note.DMajor]: Note.E,
    [Note.E]: Note.F,
    [Note.F]: Note.FMajor,
    [Note.FMajor]: Note.G,
    [Note.G]: Note.GMajor,
    [Note.GMajor]: Note.A,
    [Note.A]: Note.AMajor,
    [Note.AMajor]: Note.B,
    [Note.B]: Note.C,
} as const;

export const MinorScale: TypeScale = {
    [Note.C]: Note.DMinor,
    [Note.DMinor]: Note.D,
    [Note.D]: Note.EMinor,
    [Note.EMinor]: Note.E,
    [Note.E]: Note.F,
    [Note.F]: Note.GMinor,
    [Note.GMinor]: Note.G,
    [Note.G]: Note.AMinor,
    [Note.AMinor]: Note.A,
    [Note.A]: Note.BMinor,
    [Note.BMinor]: Note.B,
    [Note.B]: Note.C,
} as const;

export type Scale = typeof MinorScale | typeof MajorScale;

export interface NoteSettings {
    name: Note;
    octave: number;
    fret: number;
}

export const isMajor = (note: Note): boolean => MajorNotes.has(note);
export const isMinor = (note: Note): boolean => MinorNotes.has(note);
export const notMajor = (note: Note): boolean => !MajorNotes.has(note);
export const notMinor = (note: Note): boolean => !MinorNotes.has(note);

/**
 * @param {Note} note
 * @param {number} fret
 * @param {Scale} scale
 */
export const getNoteFromFret = (note: Note, fret: number, scale: Scale): NoteSettings => {
    const octave = Math.ceil(fret / 12);
    if (fret === 0) {
        return { name: note, octave, fret };
    }
    let lastNote = note;
    let count = fret;
    while (count--) lastNote = scale[lastNote] as Note;
    return { name: lastNote, octave, fret } as NoteSettings;
};
