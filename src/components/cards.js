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
        <storytitle>
          <a href=${url} target="_blank">
            <h1>${title}</h1>
          </a>
        </storytitle>
        <story-summary>
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
        </story-summary>
      </div>`
  }

  get events() {
    return {
      click: {
        h2: this.clicked,
        ".tag": this.tagged,
      }
    }
  }

  clicked() {
    console.log("clicked on", this.card.id);
  }

  tagged() {
    console.log("got tagged");
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

    return `<div class=${styles.container}>${cards}</div>`;
  }
}
