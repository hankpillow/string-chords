import { Note } from "./notes";

export const Chords: Record<string, Set<Note>> = {
    [Note.A]: new Set([Note.A, Note.CMajor, Note.E]),
    [Note.B]: new Set([Note.B, Note.DMajor, Note.FMajor]),
    [Note.C]: new Set([Note.C, Note.E, Note.G]),
    [Note.D]: new Set([Note.D, Note.FMajor, Note.A]),
    [Note.E]: new Set([Note.E, Note.GMajor, Note.B]),
    [Note.F]: new Set([Note.F, Note.A, Note.C]),
    [Note.G]: new Set([Note.G, Note.B, Note.D]),
    [Note.CMajor]: new Set([Note.CMajor, Note.E, Note.CMajor]),
    [Note.FMajor]: new Set([Note.FMajor, Note.AMajor, Note.CMajor]),
    [Note.AMinor]: new Set([Note.AMinor, Note.C, Note.EMinor]),
    [Note.BMinor]: new Set([Note.BMinor, Note.D, Note.F]),
    [Note.CMinor]: new Set([Note.CMinor, Note.EMinor, Note.GMinor]),
    [Note.DMinor]: new Set([Note.DMinor, Note.F, Note.AMinor]),
    [Note.EMinor]: new Set([Note.EMinor, Note.G, Note.BMinor]),
    [Note.GMinor]: new Set([Note.GMinor, Note.BMinor, Note.DMinor]),
};

export const setHasAllNotes = (list: Set<string>, notes: Note[]) => {
    if (list.size === 0 || notes.length === 0) {
        return false;
    }
    const checklist: Record<string, string> = {};
    for (const note of list.values()) {
        checklist[note as string] = "missing";
    }
    const hasAll: boolean = notes.reduce((has: boolean, note: string) => {
        has = has && list.has(note);
        if (has) {
            delete checklist[note];
        }
        return has;
    }, true);
    return hasAll && Object.keys(checklist).length === 0;
};

const allChords = Object.keys(Chords) as Array<Note>;
export const getChord = (...notes: Note[]): null | Note => {
    if (notes.length >= 3) {
        let targetChord: null | Note = null;
        allChords.some((name: Note) => {
            const found = setHasAllNotes(Chords[name], notes);
            targetChord = found ? name : null;
            return targetChord !== null;
        });
        return targetChord;
    }
    return null;
};
