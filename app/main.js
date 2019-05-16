import Vue from "nativescript-vue";
import store from "./store";
import Login from "./components/page/Login";

import { TNSFontIcon, fonticon } from "nativescript-fonticon";
import VueDevtools from "nativescript-vue-devtools";

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  fa: "./fonts/font-awesome.css",
  ion: "./fonts/ionicons.css"
};
TNSFontIcon.loadCss();
Vue.filter("fonticon", fonticon);




Vue.config.silent = false;

new Vue({
  store,
  render: h => h("frame", [h(Login)])
}).$start();
