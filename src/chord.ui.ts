import "./chord.ui.scss";
import { isMajor, isMinor, Notes, Scales } from "./notes";
import { IString } from "./instrument.ui.js";

export interface ICordSettings {
	string: IString;
	pressed: boolean;
	fret: number;
	index: number;
	position: number;
	lastString: boolean;
	onAction: Function;
}

export interface IChord {
	fret: number;
	html: HTMLButtonElement;
	index: number;
	pressed: boolean;
	string: IString;
	release: Function;
	press: Function;
}

/**
 * Creates new Cord UI Element
 * @param {ICordSettings} settings
 * @returns {IChord}
 */
const Chord = (settings: ICordSettings) => {
	const html: HTMLButtonElement = document.createElement("button");

	const onlyMinor = (string: Notes) => !isMinor(string);
	
	const handleState = (pressed: boolean) => {
		config.pressed = pressed;
		html.setAttribute("aria-pressed", config.pressed.toString());
	};

	let fret: number = settings.fret;
	let tune: Notes = settings.string.tune;
	while (fret > 0) {
		tune = Scales[tune].filter(onlyMinor).pop() as Notes;
		--fret;
	}
	const newString: IString = { tune, octave: 1 };

	const config: IChord = {
		html,
		fret: settings.fret,
		index: settings.index,
		pressed: settings.pressed,
		string: newString,
		press: () => handleState(true),
		release: () => handleState(false),
	};

	html.setAttribute("data-fret", config.fret.toString());
	html.setAttribute("data-major", isMajor(config.string.tune).toString());
	html.setAttribute("data-minor", isMinor(config.string.tune).toString());
	html.setAttribute("data-last-string", settings.lastString ? "true" : "false");

	html.onclick = () => {
		html.getAttribute("aria-pressed") === "true"
			? handleState(false)
			: handleState(true);
		settings.onAction && settings.onAction(config);
	};

	html.classList.add("note");
	html.textContent = config.string.tune;

	return config;
};

export default Chord;
