import "util/css/main.css"
import App from "components/app"
import loadPolyfills from "loadpoly"

const shouldPolyfill = [
  {
    test: () => window.fetch,
    load: import("whatwg-fetch")
  },
  // {
  //   test: () => Object.observe,
  //   load: import("object.observe")
  // },
];

loadPolyfills(shouldPolyfill)
  .then(()=> {
    new App();
  })
  .catch(console.error);
