import { View } from "erste"
import Card from "./card"
import styles from "./cards.css"

export default class Cards extends View {
  constructor(cards = []) {
    super();
    this.cards = cards;
  }

  onAfterRender() {
    this.cards
      .filter(e => e)
      .map((c, idx) => new Card(c, idx))
      .map(card => {
        // renders unordered ?
        card.render(this.el);
      });
  }

  template() {
    return `<cards class=${styles.container}></cards>`;
  }
}
