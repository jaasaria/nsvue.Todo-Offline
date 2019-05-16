const state = {
	dbConnection: false,
	navBottom: 0
};

const mutations = {
	setDBConnectionMutation: (state, payload) => {
		state.dbConnection = payload;
	},
	setNavBottomMutation: (state, payload) => {
		state.navBottom = payload;
	},
}

const actions = {
};


export default {
  state,
  mutations,
  actions,
};
