import { Component } from "erste"
import styles from "./cards.css"
import distanceInWordsStrict from "date-fns/distance_in_words_strict"
import { crawlDescendants } from "util/js/api"

export default class Card extends Component {
  constructor(card, idx) {
    super();
    this.card = card;
    // crawlDescendants(card.kids)
    this.idx = idx;
  }

  template() {
    const { by, descendants, id, score, time, title, url } = this.card;

    return `
      <div class=${styles.card}>
        <idx>${this.idx}</idx>
        <content>
          <h1>
            <a href=${url} target="_blank">${title}</a>
          </h1>
        </content>
        <summary>
          <span>${score} ${score ? "points" : "point"}</span>
          <span>
            <a href=https://news.ycombinator.com/user?id=${by}>
              ${by}
            </a>
          </span>
          <span>
            <a href=https://news.ycombinator.com/item?id=${id}>
              <span>${descendants} comments</span>
            </a>
          </span>
          <span class="timestamp">${distanceInWordsStrict(new Date(time*1000), Date.now())} ago</span>
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
