import { Component } from "erste"
import distanceInWordsStrict from "date-fns/distance_in_words_strict"

export default class Comment extends Component {
  constructor(comment) {
    super();
    this.comment = comment;
  }

  template() {
    // there is markup in text
    const { by, id, kids, parent, text, time, type } = this.comment;

    return `
      <div>
        <summary>
          <span>
            <a href=https://news.ycombinator.com/user?id=${by}>
              ${by}
            </a>
          </span>
          <span class="timestamp">${distanceInWordsStrict(new Date(time*1000), Date.now())} ago</span>
        </summary>
      </div>
    `;
  }
}
