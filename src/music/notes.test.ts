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

// test(`getNoteFromFret(note, fret, scale): when fret=1 and scale=Major scale`, async (t) => {
//     const getNextNote = (note: Note): NoteSettings => {
//         return getNoteFromFret(note, 1, MajorScale);
//     };
//     await t.test(`note=${Note.A} -> ${Note.AMajor} fret 1`, () => {
//         const note = getNextNote(Note.A);
//         assert.equal(note.name, Note.AMajor);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.AMajor} -> ${Note.B} fret 1`, () => {
//         const note = getNextNote(Note.AMajor);
//         assert.equal(note.name, Note.B);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.B} -> ${Note.C} fret 1`, () => {
//         const note = getNextNote(Note.B);
//         assert.equal(note.name, Note.C);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.C} -> ${Note.CMajor} fret 1`, () => {
//         const note = getNextNote(Note.C);
//         assert.equal(note.name, Note.CMajor);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.CMajor} -> ${Note.D} fret 1`, () => {
//         const note = getNextNote(Note.CMajor);
//         assert.equal(note.name, Note.D);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.D} -> ${Note.DMajor} fret 1`, () => {
//         const note = getNextNote(Note.D);
//         assert.equal(note.name, Note.DMajor);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.DMajor} -> ${Note.E} fret 1`, () => {
//         const note = getNextNote(Note.DMajor);
//         assert.equal(note.name, Note.E);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.E} -> ${Note.F} fret 1`, () => {
//         const note = getNextNote(Note.E);
//         assert.equal(note.name, Note.F);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.F} -> ${Note.FMajor} fret 1`, () => {
//         const note = getNextNote(Note.F);
//         assert.equal(note.name, Note.FMajor);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.FMajor} -> ${Note.G} fret 1`, () => {
//         const note = getNextNote(Note.FMajor);
//         assert.equal(note.name, Note.G);
//         assert.equal(note.fret, 1);
//     });

//     await t.test(`note=${Note.G} -> ${Note.GMajor} fret 1`, () => {
//         const note = getNextNote(Note.G);
//         assert.equal(note.name, Note.GMajor);
//         assert.equal(note.fret, 1);
//     });
//     await t.test(`note=${Note.GMajor} -> ${Note.A} fret 1`, () => {
//         const note = getNextNote(Note.GMajor);
//         assert.equal(note.name, Note.A);
//         assert.equal(note.fret, 1);
//         assert.equal(note.octave, 0);
//     });
// });
//  
describe("getNoteFromFret(note,fret,scale)",()=>{
    test(`Given (A, 0, MajorScale) returns {note:A,fret:0,octave:0}`, () => {
        const next = getNoteFromFret(Note.A, 0, MajorScale);
        expect(next.name).toBe(Note.A);
        expect(next.fret).toBe(0);
        expect(next.octave).toBe(0);
    });

    test(`Given (A, 11, MajorScale) returns {note:GManjor,fret:11,octave:0}`, () => {
        const next = getNoteFromFret(Note.A, 11, MajorScale);
        expect(next.name).toBe( Note.GMajor);
        expect(next.fret).toBe( 11);
        expect(next.octave).toBe( 0);
    });

    test(`Given (A, 12, MajorScale) returns {note:A,fret:12,octave:1}`, () => {
        const next = getNoteFromFret(Note.A, 12, MajorScale);
        expect(next.name).toBe(Note.A);
        expect(next.fret).toBe(12);
        expect(next.octave).toBe(1);
    });
})
