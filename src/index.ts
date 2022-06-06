import "./index.scss";

import BanjoSetting from "./instruments/banjo.js";
import Instrument from "./instrument.ui.js";
import { IChord } from "./chord.ui";

const armElement: HTMLDivElement = document.querySelector(
	".instrument"
) as HTMLDivElement;

const instrument = Instrument({
	...BanjoSetting,
	onChange: (pressedStrings: Array<IChord>) => {
		console.table(pressedStrings);
	},
});
armElement.appendChild(instrument.html);
