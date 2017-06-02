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

export default class Application {
  constructor() {

    const vm = new ViewManager();
    // const mainView = new MainView(vm);
    const sidebar = new Sidebar(history);

    sidebar.vm = vm;
    // sidebar.on("switchView", e => mainView.activateItemByName(e.view));
    sidebar.render(document.body);

    // vm.setCurrentView(mainView);
  }
}
