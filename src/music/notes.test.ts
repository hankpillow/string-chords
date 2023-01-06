import { Note, NoteSettings, isMinor, isMajor, isOpen, getNoteFromFret } from "./notes";
import { MajorScale } from "./scales";

const openNotes = [Note.C, Note.D, Note.E, Note.F, Note.A, Note.G, Note.B];
const majorNotes = [Note.CMajor, Note.DMajor, Note.FMajor, Note.GMajor, Note.AMajor];
const minorNotes = [Note.CMinor, Note.DMinor, Note.EMinor, Note.GMinor, Note.AMinor, Note.BMinor];

openNotes.forEach((note: Note) => {
    test(`isOpen(${note}) should be true`, () => {
        expect(isOpen(note)).toBe(true);
    });
});

majorNotes.forEach((note: Note) => {
    test(`isMajor(${note}) should be true`, () => {
        expect(isMajor(note)).toBe(true);
    });
});

minorNotes.forEach((note: Note) => {
    test(`isMinor(${note}) should be true`, () => {
        expect(isMinor(note)).toBe(true);
    });
});

const getNextNote = (note: Note): NoteSettings => {
    return getNoteFromFret(note, 1, MajorScale);
};

describe("getNoteFromFret(note,fret,scale)", () => {
    test(`note=${Note.A} -> ${Note.AMajor} fret 1`, () => {
        const note = getNextNote(Note.A);
        expect(note.name).toBe(Note.AMajor);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.AMajor} -> ${Note.B} fret 1`, () => {
        const note = getNextNote(Note.AMajor);
        expect(note.name).toBe(Note.B);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.B} -> ${Note.C} fret 1`, () => {
        const note = getNextNote(Note.B);
        expect(note.name).toBe(Note.C);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.C} -> ${Note.CMajor} fret 1`, () => {
        const note = getNextNote(Note.C);
        expect(note.name).toBe(Note.CMajor);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.CMajor} -> ${Note.D} fret 1`, () => {
        const note = getNextNote(Note.CMajor);
        expect(note.name).toBe(Note.D);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.D} -> ${Note.DMajor} fret 1`, () => {
        const note = getNextNote(Note.D);
        expect(note.name).toBe(Note.DMajor);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.DMajor} -> ${Note.E} fret 1`, () => {
        const note = getNextNote(Note.DMajor);
        expect(note.name).toBe(Note.E);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.E} -> ${Note.F} fret 1`, () => {
        const note = getNextNote(Note.E);
        expect(note.name).toBe(Note.F);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.F} -> ${Note.FMajor} fret 1`, () => {
        const note = getNextNote(Note.F);
        expect(note.name).toBe(Note.FMajor);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.FMajor} -> ${Note.G} fret 1`, () => {
        const note = getNextNote(Note.FMajor);
        expect(note.name).toBe(Note.G);
        expect(note.fret).toBe(1);
    });

    test(`note=${Note.G} -> ${Note.GMajor} fret 1`, () => {
        const note = getNextNote(Note.G);
        expect(note.name).toBe(Note.GMajor);
        expect(note.fret).toBe(1);
    });
    test(`note=${Note.GMajor} -> ${Note.A} fret 1`, () => {
        const note = getNextNote(Note.GMajor);
        expect(note.name).toBe(Note.A);
        expect(note.fret).toBe(1);
        expect(note.octave).toBe(0);
    });
    test(`Given (A, 0, MajorScale) returns {note:A,fret:0,octave:0}`, () => {
        const next = getNoteFromFret(Note.A, 0, MajorScale);
        expect(next.name).toBe(Note.A);
        expect(next.fret).toBe(0);
        expect(next.octave).toBe(0);
    });

    test(`Given (A, 11, MajorScale) returns {note:GManjor,fret:11,octave:0}`, () => {
        const next = getNoteFromFret(Note.A, 11, MajorScale);
        expect(next.name).toBe(Note.GMajor);
        expect(next.fret).toBe(11);
        expect(next.octave).toBe(0);
    });

    test(`Given (A, 12, MajorScale) returns {note:A,fret:12,octave:1}`, () => {
        const next = getNoteFromFret(Note.A, 12, MajorScale);
        expect(next.name).toBe(Note.A);
        expect(next.fret).toBe(12);
        expect(next.octave).toBe(1);
    });
});
