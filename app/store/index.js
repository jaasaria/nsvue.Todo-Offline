import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import user from './modules/user';
import item from './modules/item';
import news from './modules/news';
import auth from './modules/auth';
import backend from './modules/backend';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
		backend,
		user,
		item,
		news,
		auth
  },
  strict: (TNS_ENV === 'debug'),
});

Vue.prototype.$store = store;
export default store;
