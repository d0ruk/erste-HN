import "util/css/main.css"
import { getCurated } from "util/js/api"
import App from "components/app"
import loadPolyfills from "loadpoly"

import Sidebar from "./components/sidebar"
import Cards from "./components/cards"
import Comments from "./components/comments"

const shouldPolyfill = [
  {
    test: !!window.fetch,
    load: () => import(/* webpackChunkName: "whatwg-fetch" */ "whatwg-fetch")
  },
];

const HN = new App(document.getElementById("app"));

document.body.className = "loader";

loadPolyfills(shouldPolyfill)
  .then(() => getCurated(15))
  .then(data => {
    const cards = new Cards(data);
    cards.vm = HN.vm;

    HN.vm.pull(cards);
    document.body.className = "";
  })
  // .then(() => {
  //   const sidebar = new Sidebar();
  //   setTimeout(() => {
  //     HN.vm.pull(sidebar, true);
  //     setTimeout(() => {
  //       const comments = new Comments();
  //       // comments.vm = vm;
  //       HN.setView(cards)
  //     }, 500);
  //   }, 1000);
  // })
  .catch(console.error);
