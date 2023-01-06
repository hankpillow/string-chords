import { html, Component } from "htm/preact/standalone";

export default class Display extends Component {
    state = { items: this.props.items };
    onUpdate = (this.props.onUpdate as Function) || function () {};

    update(name: string, checked: boolean) {
        const { items } = this.state;
        items[name] = checked;
        this.setState({ items });
        this.onUpdate(items);
    }

    render({ items }) {
        return html` <details id="display">
            <summary>Display</summary>
            ${Object.keys(items).map((name) => {
                const checked = items[name] as boolean;
                return html`<label>
                    <input
                        type="checkbox"
                        name=${name}
                        checked="${checked}"
                        onChange=${(event) => this.update(name, event.target.checked)}
                    />
                    ${name}
                </label>`;
            })}
        </details>`;
    }
}
