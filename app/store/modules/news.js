import NewsServices from '@/services/NewsServices'
const newsServices = new NewsServices()

const state = {
	newsState: [],
};

const getters = {
}

const mutations = {
	setNewsMutation: (state, payload) => {
    state.newsState = payload;
	},
}

const actions = {
	fetchNewsAction() {
		return new Promise((resolve, reject) => {
			newsServices.getNews().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.error(error)
			})
		})
	},

};

export default {
	state,
	getters,
  mutations,
  actions,
};
