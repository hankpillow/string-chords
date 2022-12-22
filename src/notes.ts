export enum Note {
  C = "C",
  CMajor = "C#",
  DMinor = "D♭",
  D = "D",
  DMajor = "D#",
  EMinor = "E♭",
  E = "E",
  F = "F",
  FMajor = "F#",
  GMinor = "G♭",
  G = "G",
  GMajor = "G#",
  AMinor = "A♭",
  A = "A",
  AMajor = "A#",
  BMinor = "B♭",
  B = "B",
}

export const MajorNotes = new Set([
  Note.CMajor,
  Note.DMajor,
  Note.FMajor,
  Note.GMajor,
  Note.AMajor,
]);

export const MinorNotes = new Set([
  Note.DMinor,
  Note.EMinor,
  Note.GMinor,
  Note.AMinor,
  Note.BMinor,
]);

export const DefaultNotes = new Set([
  Note.C,
  Note.D,
  Note.E,
  Note.F,
  Note.A,
  Note.G,
  Note.B,
]);

type TypeScale = Record<string, string>;

export const NotesNames: TypeScale = {
  [Note.C]: "Do",
  [Note.CMajor]: "Do Major",
  [Note.DMinor]: "Re Minor",
  [Note.D]: "Re",
  [Note.DMajor]: "Re Major",
  [Note.EMinor]: "Mi Minor",
  [Note.E]: "Mi",
  [Note.F]: "Fa",
  [Note.FMajor]: "Fa Major",
  [Note.GMinor]: "Sol Minor",
  [Note.G]: "Sol",
  [Note.GMajor]: "Sol Major",
  [Note.AMinor]: "La Minor",
  [Note.A]: "La",
  [Note.AMajor]: "La Major",
  [Note.BMinor]: "Si Minor",
  [Note.B]: "Si",
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

export type Scales = typeof MinorScale | typeof MajorScale;

export interface NoteSettings {
  name: Note;
  octave: number;
  fret: number;
}

export const isMajor = (note: Note): boolean => MajorNotes.has(note);
export const isMinor = (note: Note): boolean => MinorNotes.has(note);

export const notMajor = (note: Note): boolean => !MajorNotes.has(note);
export const notMinor = (note: Note): boolean => !MinorNotes.has(note);

export const isOpen = (note: Note): boolean => DefaultNotes.has(note);
export const notOpen = (note: Note): boolean => !DefaultNotes.has(note);

export const getNoteFromFret = (note: Note, fret: number, scale: Scales) => {
  let lastNote = note;
  let fretLoop = fret;
  while (--fretLoop) {
    lastNote = scale[lastNote] as Note;
  }
  return { name: lastNote, octave: Math.ceil(fret / 12), fret };
};
