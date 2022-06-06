import "./instrument.ui.scss";
import Chord, { ICordSettings, IChord } from "./chord.ui";
import { Notes } from "./notes";

export interface IString {
	tune: Notes;
	octave: number;
}

export interface IInstrumentSettings {
	name: string;
	strings: Array<IString>;
	frets: number;
	onChange: Function;
}

const Instrument = (settings: IInstrumentSettings) => {
	const handleCordAction = (actionCord: IChord) => {
		chords[actionCord.index].forEach((api: IChord) => {
			if (api.html !== actionCord.html) {
				api.release();
			}
		});

		const pressedKeys = chords.reduce(
			(result, chordList: Array<IChord>, position: number) => {
				result[position] = chordList
					.filter((chord: IChord) => chord.pressed)
					.pop() as IChord;
				return result;
			},
			Array(settings.strings.length)
		).reverse();

		settings.onChange(pressedKeys);
	};

	const eachString = (fret: number) => {
		return (string: IString, index: number, list: any) => {
			const reverseIndex = list.length - index;
			const cordElement: IChord = Chord({
				fret,
				string,
				index,
				position: reverseIndex,
				lastString: reverseIndex === list.length,
				pressed: false,
				onAction: handleCordAction,
			} as ICordSettings);

			chords[index].push(cordElement);
			html.appendChild(cordElement.html);
		};
	};

	const html = document.createElement("div");
	html.classList.add("arm");

	const chords: Array<Array<IChord>> = settings.strings.map(() => []);
	let fret = 0;
	while (fret < settings.frets) {
		settings.strings.reverse().forEach(eachString(fret));
		++fret;
	}

	return { html };
};

export default Instrument;
