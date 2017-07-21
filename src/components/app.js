import {
  ViewManager,
  // Sidebar,
  // TabView,
  // NavBar,
  // PullToRefresh,
  // InfiniteScroll,
} from "erste";

// import Sidebar from "./sidebar"
// import Cards from "./cards"
// import Comments from "./comments"

export default class Application {
  constructor(rootEl) {
    const vm = this.vm = new ViewManager(rootEl);
    // const sidebar = new Sidebar();
    // const cards = new Cards(data);
    // sidebar.vm = vm;
    // cards.vm = vm;
    // sidebar.on("switchView", e => mainView.activateItemByName(e.view));

    // vm.setCurrentView(cards);
    // setTimeout(() => {
    //   vm.pull(sidebar, true);
    //   setTimeout(() => {
    //     const comments = new Comments();
    //     // comments.vm = vm;
    //     this.setView(comments)
    //   }, 500);
    // }, 1000);
  }

  setView(view) {
    this.vm.setCurrentView(view);
  }


}

if (module.hot) {
  module.hot.accept();
}
