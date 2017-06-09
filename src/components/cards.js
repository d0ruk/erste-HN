import { Component } from "erste"
import styles from "./cards.css"

class Card extends Component {
  constructor(card) {
    super();
    this.card = card;
  }

  template() {
    const { by, descendants, id, score, time, title, url } = this.card;

    return `
      <div class=${styles.card}>
        <content>
          <h1>
            <a href=${url} target="_blank">${title}</a>
          </h1>
        </content>
        <summary>
          <span>${score} points</span>
          <span>
            <a href=https://news.ycombinator.com/user?id=${by}>
              ${by}
            </a>
          </span>
          <span>
            <a href=https://news.ycombinator.com/item?id=${id}>
              <span class="tag">${new Date(time)}</span>
            </a>
          </span>
        </summary>
      </div>`
  }

  get events() {
    return {
      click: {
        content: this.clicked,
      }
    }
  }

  clicked() {
    console.log("clicked on", this.card.id);
  }
}

export default class Cards extends Component {
  constructor(data = []) {
    super();
    this.data = data;
  }

  template() {
    const cards = this.data
      .filter(e => e)
      .map(e => new Card(e));

    return `<cards class=${styles.container}>${cards}</cards>`;
  }
}
