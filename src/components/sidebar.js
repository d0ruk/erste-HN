import { Sidebar } from "erste"

const pin = `<svg class="svg-icon" viewBox="0 0 20 20"><path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path></svg>`

const styles = {
  wrapper: "",
  label: `
    color: red;
    font-variant: small-caps;
    font-size: 4rem;
    margin: .5rem
  `,

  button: `
    font-size: 1rem;
    padding: .2rem;
    margin: .5rem;
    line-height: 1.5rem;
    vertical-align: center;
    color: red;
  `
}

export default class extends Sidebar {

  template_items() {
    return `
      <sidebar-item class="sidebar-item" style=${styles.wrapper.replace(/\s/g,"")}>
        <sidebar-label  style=${styles.label.replace(/\s/g,"")}>
        </sidebar-label>
      </sidebar-item>
      <button class="button" style=${styles.button.replace(/\s/g,"")}>
          <i class="icon">${pin}</i>
          Hakkında
      </button>
      `;
  }

  get events() {
    return {
      "click": {
        button: this.navigate
      },

      "tap": {
        button: this.navigate
      }
    }
  }
}
