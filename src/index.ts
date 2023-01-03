import { render, html, Component } from "htm/preact/standalone";
import Display from "./ui/display";
import BanjoSetting from "./settings/banjo";
import Instrument, { InstrumentSettings } from "./ui/instrument";

class App extends Component {
  state = {
    view: {
      note: true,
      major: true,
      minor: true,
      fret: true
    },
  }
  render({ instrument }: { instrument: InstrumentSettings }) {
    return html`
    <main>
      <header>
        <h1 aria-describedby="instrument-name">🎵String Chords</h1>
        <small id="instrument-name">${instrument.name}</small>
      </header>
      <aside>
          <${Display} 
            items=${this.state.view}
            onUpdate=${(items: Record<string, boolean>) => { this.setState({ view: items }) }}
          />
        <div id="chords"></div>
      </aside>
      <${Instrument} view=${this.state.view} settings=${instrument} />
    </main>
    `;
  }
}

render(html`<${App} instrument=${BanjoSetting}/>`, document.body);
