import "./index.scss";
import BanjoSetting from "./settings/banjo.ts";
import Instrument from "./ui/instrument.ts";
import { StringNote } from "./ui/string-note.ts";
import { render, html } from "htm/preact/standalone";

const instrument = Instrument({
	...BanjoSetting,
	// onChange: (pressedStrings: Array<StringNote>) => {
	// 	console.table(pressedStrings);
	// },
});

render(instrument, document.querySelector(".instrument"));
// render(html`<h1>igor</h1>`, document.querySelector(".instrument"));
