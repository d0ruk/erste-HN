import "util/css/main.css"
import { getCurated } from "util/js/api"
import App from "components/app"
import loadPolyfills from "loadpoly"

const shouldPolyfill = [
  {
    test: () => window.fetch,
    load: import(/* webpackChunkName: "whatwg-fetch" */ "whatwg-fetch")
  },
];

document.body.className = "loader";

loadPolyfills(shouldPolyfill)
  .then(() => getCurated(15))
  .then(arr => {
    document.body.className = "";
    new App(arr);
  })
  .catch(console.error);
