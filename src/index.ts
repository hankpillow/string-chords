import "./index.scss";
import { render, html } from "htm/preact/standalone";
import BanjoSetting from "./settings/banjo";
import Instrument from "./ui/instrument";
import Display from "./ui/display";
import ShowChords from "./ui/show-chords";

const updateDisplay = (views: Record<string, boolean>) => {
  (document.querySelector("#instrument") as HTMLDivElement)
    .setAttribute(
      "data-display",
      Object.keys(views).filter(view => views[view]).join(",")
    )
}

const onNotePressed = (notes) => {
  chords.update(notes)
  chords.render();
}

const chords = ShowChords();
const display = Display({ update: updateDisplay });
const instrument = Instrument({ ...BanjoSetting, keyPress: onNotePressed })

const app = html`
<header><h1>🎵String Chords</h1></header>
<section>
  <div id="views">${display.render()}</div>
  <div id="chords">${chords.render()}</div>
</section>
<div id="instrument">${instrument.render()}</div>
`;

render(app, document.body);

// on mount
updateDisplay(display.items);
