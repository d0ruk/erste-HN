import { View } from "erste"
import Comment from "./comment"

const initial = [
  {
    by: "foo",
    time: 1000000
  }
]

export default class Comments extends View {
  constructor(tree = initial) {
    super();
    this.tree = tree;
  }

  onAfterRender() {
    this.tree
      .map((c, idx) => new Comment(c, idx))
      .map(comment => {
        comment.render(this.el);
      });
  }

  template() {
    return "<comments></comments>";
  }
}
