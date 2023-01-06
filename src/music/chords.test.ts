import { getChord, setHasAllNotes } from "./chords";
import { Note, getNoteFromFret } from "./notes";
import { MajorScale } from "./scales";

const getNoteSettings = (note: Note) => {
    return getNoteFromFret(note, 0, MajorScale);
};

describe("setHasAllNotes(set,notes[])", () => {
    test("Given an empty set and note list it returns false", () => {
        expect(setHasAllNotes(new Set(), [])).toBe(false);
    });
    describe("Given the Set([A])", () => {
        const S = new Set([Note.A]);
        test("and notes[A] it should return true", () => {
            expect(setHasAllNotes(S, [Note.A])).toBe(true);
        });
        test("and notes[A,A] it should return true", () => {
            expect(setHasAllNotes(S, [Note.A, Note.A])).toBe(true);
        });
        test("and notes[] it should return false", () => {
            expect(setHasAllNotes(S, [])).toBe(false);
        });
        test("and notes[B] it should return false", () => {
            expect(setHasAllNotes(S, [Note.B])).toBe(false);
        });
        test("and notes[B,A] it should return false", () => {
            expect(setHasAllNotes(S, [Note.B, Note.A])).toBe(false);
        });
    });
    describe("Given the Set([A,B])", () => {
        const S = new Set([Note.A, Note.B]);
        test("and notes[A,B] it should return true", () => {
            expect(setHasAllNotes(S, [Note.A, Note.B])).toBe(true);
        });
        test("and notes[A,B,A] it should return true", () => {
            expect(setHasAllNotes(S, [Note.A, Note.B, Note.A])).toBe(true);
        });
        test("and notes[] it should return false", () => {
            expect(setHasAllNotes(S, [])).toBe(false);
        });
        test("and notes[B] it should return false", () => {
            expect(setHasAllNotes(S, [Note.B])).toBe(false);
        });
        test("and notes[A] it should return false", () => {
            expect(setHasAllNotes(S, [Note.A])).toBe(false);
        });
        test("and notes[A,B,C] it should return false", () => {
            expect(setHasAllNotes(S, [Note.A, Note.B, Note.C])).toBe(false);
        });
    });
});

describe("getChord(note,note,...note):Note", () => {
    test(`[A,CMajor,E] should return A`, () => {
        expect(getChord(Note.A, Note.CMajor, Note.E)).toBe(Note.A);
    });
    test(`[Note.B, Note.DMajor, Note.FMajor] should return A`, () => {
        expect(getChord(Note.B, Note.DMajor, Note.FMajor)).toBe(Note.B);
    });
    test(`[Note.C, Note.E, Note.G] should return A`, () => {
        expect(getChord(Note.C, Note.E, Note.G)).toBe(Note.C);
    });
    test(`[Note.D, Note.FMajor, Note.A] should return A`, () => {
        expect(getChord(Note.D, Note.FMajor, Note.A)).toBe(Note.D);
    });
    test(`[Note.E, Note.GMajor, Note.B] should return A`, () => {
        expect(getChord(Note.E, Note.GMajor, Note.B)).toBe(Note.E);
    });
    test(`[Note.F, Note.A, Note.C] should return A`, () => {
        expect(getChord(Note.F, Note.A, Note.C)).toBe(Note.F);
    });
    test(`[Note.G, Note.B, Note.D] should return A`, () => {
        expect(getChord(Note.G, Note.B, Note.D)).toBe(Note.G);
    });
    test(`[Note.CMajor, Note.E, Note.CMajor] should return A`, () => {
        expect(getChord(Note.CMajor, Note.E, Note.CMajor)).toBe(Note.CMajor);
    });
    test(`[Note.FMajor, Note.AMajor, Note.CMajor] should return A`, () => {
        expect(getChord(Note.FMajor, Note.AMajor, Note.CMajor)).toBe(Note.FMajor);
    });
    test(`[Note.AMinor, Note.C, Note.EMinor] should return A`, () => {
        expect(getChord(Note.AMinor, Note.C, Note.EMinor)).toBe(Note.AMinor);
    });
    test(`[Note.BMinor, Note.D, Note.F] should return A`, () => {
        expect(getChord(Note.BMinor, Note.D, Note.F)).toBe(Note.BMinor);
    });
    test(`[Note.CMinor, Note.EMinor, Note.GMinor] should return A`, () => {
        expect(getChord(Note.CMinor, Note.EMinor, Note.GMinor)).toBe(Note.CMinor);
    });
    test(`[Note.DMinor, Note.F, Note.AMinor] should return A`, () => {
        expect(getChord(Note.DMinor, Note.F, Note.AMinor)).toBe(Note.DMinor);
    });
    test(`[Note.EMinor, Note.G, Note.BMinor] should return A`, () => {
        expect(getChord(Note.EMinor, Note.G, Note.BMinor)).toBe(Note.EMinor);
    });
    test(`[Note.GMinor, Note.BMinor, Note.DMinor] should return A`, () => {
        expect(getChord(Note.GMinor, Note.BMinor, Note.DMinor)).toBe(Note.GMinor);
    });
});
