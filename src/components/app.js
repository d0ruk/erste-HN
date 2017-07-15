import {
  // Component,
  ViewManager,
  // View,
  // locale,
  // Sidebar,
  // TabView,
  // NavBar,
  // PullToRefresh,
  // InfiniteScroll,
} from "erste";

// import MainView from "./views/main-view";
import Sidebar from "./sidebar"
import Cards from "./cards"

export default class Application {
  constructor(data) {
    const vm = new ViewManager();
    // const mainView = new MainView(vm);
    const sidebar = new Sidebar();
    const cards = new Cards(data);
    sidebar.vm = vm;
    cards.vm = vm;
    // sidebar.on("switchView", e => mainView.activateItemByName(e.view));
    cards.render(document.getElementById("app"));

    // vm.setCurrentView(mainView);
  }
}

// broken HMR.. re-render?
if (module.hot) {
  module.hot.accept();
}
