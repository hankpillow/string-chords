import "./index.scss";
import { render, html } from "htm/preact/standalone";
import BanjoSetting from "./settings/banjo";
import Instrument from "./ui/instrument";
import Display from "./ui/display";

const updateDisplay = (views: Record<string, boolean>) => {
  (document.querySelector("#instrument") as HTMLDivElement)
    .setAttribute(
      "data-display",
      Object.keys(views).filter(view => views[view]).join(",")
    )
}

const instrument = Instrument({ ...BanjoSetting })
const display = Display({ update: updateDisplay });

render(html`
<header>
  <h1>🎵 String Chords</h1>
</header>
<div id="views">
  ${display.render()}
</div>
<main>
  <div id="instrument">
    ${instrument.render()}
  </div>
</main>
`, document.body);

// on mount
updateDisplay(display.items);
