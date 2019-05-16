import AuthServices from '@/services/AuthServices'
import store from '@/store';
const authServices = new AuthServices()

const state = {
	isLoginState: false,
	loginInfo: []
};

const mutations = {
	setLoginMutation: (state, payload) => {
		state.loginInfo = payload;
		state.isLoginState = true;
	},
	setLogOutMutation: (state) => {
		state.loginInfo = [],
		state.isLoginState = false
		store.state.item.itemsFavoritesState = []
	},
	getImageMutation: (state, payload) => {
		state.loginInfo.image = payload.image;
		state.loginInfo.path_thumbnails = payload.path_thumbnails;
	},
	// setAuthDataMutation: (state, payload) => {
	// 	state.loginInfo = payload;
	// 	state.isLoginState = true
	// },

}


const actions = {

	getImageAction() {
		return new Promise((resolve, reject) => {
			authServices.getImage().then(response => {
				commit('getImageMutation', response.data)
				resolve(response);
			}, error => {
				console.log(error)
				reject(error);
			})
		})
	},




	fetchAuthDataAction() {
		return new Promise((resolve, reject) => {

			console.log('checking fetchAuthDataAction')
			authServices.getAuthData().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.error(error)
			})
		})
	},

	
	signOutAction() {

		setTimeout(() => {	
			store.commit('setLogOutMutation')
			global.setToken('')
		}, 1000);				
		
	}

};


export default {
  state,
  mutations,
  actions,
};
