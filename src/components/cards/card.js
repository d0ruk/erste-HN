import { Component } from "erste"
import styles from "./cards.css"
import distanceInWordsStrict from "date-fns/distance_in_words_strict"
// import { getComments } from "util/js/api"

export default class Card extends Component {
  constructor(card, idx) {
    super();
    this.card = card;
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
          <span class="descendants">
            <a href=https://news.ycombinator.com/item?id=${id}>
              <span>${descendants ? `${descendants} comments` : "discuss"}</span>
            </a>
          </span>
          <span class="timestamp">${distanceInWordsStrict(new Date(time*1000), Date.now())} ago</span>
        </summary>
      </div>`;
  }

  get events() {
    return {
      click: {
        content: this.clicked,
        ".descendants": this.goToComments
      }
    }
  }

  goToComments() {
    // var now = Date.now()
    // getComments(this.card.kids).then(console.dir).then(() => console.log(Date.now() - now))
  }

  clicked() {
    console.log("clicked on", this.card.id);
  }
}
