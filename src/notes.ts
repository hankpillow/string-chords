export enum Notes {
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

export const isMajor = (note: Notes): boolean => scaleMajors.has(note);
export const isMinor = (note: Notes): boolean => scaleMinors.has(note);

export const scaleMajors = new Set([
	Notes.CMajor,
	Notes.DMajor,
	Notes.FMajor,
	Notes.GMajor,
	Notes.AMajor,
]);

export const scaleMinors = new Set([
	Notes.DMinor,
	Notes.EMinor,
	Notes.GMinor,
	Notes.AMinor,
	Notes.BMinor,
]);

export const scaleDefault = new Set([
	Notes.C,
	Notes.D,
	Notes.E,
	Notes.F,
	Notes.G,
	Notes.A,
	Notes.B,
]);

export const NoteNames = {
	[Notes.C]: "Do",
	[Notes.CMajor]: "Do Major",
	[Notes.DMinor]: "Re Minor",
	[Notes.D]: "Re",
	[Notes.DMajor]: "Re Major",
	[Notes.EMinor]: "Mi Minor",
	[Notes.E]: "Mi",
	[Notes.F]: "Fa",
	[Notes.FMajor]: "Fa Major",
	[Notes.GMinor]: "Sol Minor",
	[Notes.G]: "Sol",
	[Notes.GMajor]: "Sol Major",
	[Notes.AMinor]: "La Minor",
	[Notes.A]: "La",
	[Notes.AMajor]: "La Major",
	[Notes.BMinor]: "Si Minor",
	[Notes.B]: "Si",
};

export const Scales = {
	[Notes.C]: [Notes.CMajor, Notes.DMinor],
	[Notes.CMajor]: [Notes.D],
	[Notes.DMinor]: [Notes.D],
	[Notes.D]: [Notes.DMajor, Notes.EMinor],
	[Notes.DMajor]: [Notes.E],
	[Notes.EMinor]: [Notes.E],
	[Notes.E]: [Notes.F],
	[Notes.F]: [Notes.FMajor, Notes.GMinor],
	[Notes.FMajor]: [Notes.G],
	[Notes.GMinor]: [Notes.G],
	[Notes.G]: [Notes.GMajor, Notes.AMinor],
	[Notes.GMajor]: [Notes.A],
	[Notes.AMinor]: [Notes.A],
	[Notes.A]: [Notes.AMajor, Notes.BMinor],
	[Notes.AMajor]: [Notes.B],
	[Notes.BMinor]: [Notes.B],
	[Notes.B]: [Notes.C],
};
