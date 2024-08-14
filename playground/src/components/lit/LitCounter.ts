import { LitElement, html, css } from 'lit'

export class LitCounter extends LitElement {
  static properties = {
    count: { type: Number, state: true },
    step: { type: Number },
  }

  declare count: number
  declare step: number

  static styles = css`
    .counter {
      display: grid;
      font-size: 2em;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-top: 2em;
      place-items: center;
    }

    .counter-message {
      text-align: center;
    }
  `

  constructor() {
    super()
    this.count = 0
    this.step = 1
  }

  subtract = () => {
    this.count -= this.step
  }

  add = () => {
    this.count += this.step
  }

  render() {
    return html`
      <div class="counter">
        <button @click=${this.subtract}>-</button>
        <pre>${this.count}</pre>
        <button @click=${this.add}>+</button>
      </div>
      <div class="counter-message">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('lit-counter', LitCounter)
