import { Note } from "./notes";

export type Scale = Record<string, Note>;

export const MajorScale: Scale = {
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
};

export const MinorScale: Scale = {
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
};
