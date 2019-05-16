import ItemServices from '@/services/ItemServices'
import { getString, setString } from 'tns-core-modules/application-settings'

const itemServices = new ItemServices()


const state = {
	itemsState: [],
	itemsFavoritesState: [],
	categoryState: [],
	categoryItemCountState: [],
	categoryItemCountWithAllState: [],
	itemsCartState: [],
	headerCartState: [],
	transactionState: [],
	transactionItemsState: [],
	selectedCategory: 0,

};

const getters = {
  items: state => {
		return state.itemsState;
	},
	getItemDetailsById: (state) => (id) => {
		return state.itemsState.find(item => item.id === id);
	},
	getItemDetailsByBarcode: (state) => (id) => {
		return state.itemsState.find(item => item.barcode == id);
	},
	getItemIndexById: (state) => (id) => {
		return state.itemsState.findIndex(item => item.id === id);
	},
	getCartDetailsById: (state) => (id) => {
		return state.itemsCartState.find(item => item.id === id);
	},
	getCartIndexById: (state) => (id) => {
		return state.itemsCartState.findIndex(item => item.id === id);
	},
	getFavoritesById: (state) => (id) => {
		return state.itemsFavoritesState.find(item => item.id === id);
	},

}


const mutations = {
	setItemsMutation: (state, payload) => {
    state.itemsState = payload;
	},
	setItemsFavoritesMutation: (state, payload) => {
    state.itemsFavoritesState = payload;
	},
	setCategoryMutation: (state, payload) => {
    state.categoryState = payload;
	},
	setCategoryItemCountMutation: (state, payload) => {
		state.categoryItemCountState = payload;
	},
	setCategoryItemCountWithAllMutation: (state, payload) => {
		state.categoryItemCountWithAllState = payload;
	},
	setSelectedCategoryMutation: (state, payload) => {
		state.selectedCategory = payload;
	},
	setItemsCartMutation: (state, payload) => {
		state.itemsCartState = JSON.parse(payload);
	},
	clearCartItemsMutation: (state) => {
		state.itemsCartState = [];
		state.headerCartState = [];
	},
	setHeaderCartMutation: (state, payload) => {
		state.headerCartState = payload;
	},
	addItemsCartMutation: (state, payload) => {
		state.itemsCartState.push(payload)
	},
	deleteItemCartByFindIdMutation: (state, payload) => {
		let index =  state.itemsCartState.find(item => item.id === payload.id)
		if (index){
			let item = state.itemsCartState.indexOf(index)
			state.itemsCartState.splice(item,1)
		}
	},
	deleteItemLikeByFindIdMutation: (state, payload) => {
		let index =  state.itemsFavoritesState.find(item => item.id === payload.id)
		if (index){
			let item = state.itemsFavoritesState.indexOf(index)
			state.itemsFavoritesState.splice(item,1)
		}
	},
	deleteItemFavoriteByFindIdMutation: (state, payload) => {
		let index =  state.itemsFavoritesState.find(item => item.id === payload.id)
		if (index){
			let item = state.itemsFavoritesState.indexOf(index)
			state.itemsFavoritesState.splice(item,1)
		}
	},
	setTransactionMutation: (state, payload) => {
		state.transactionState = payload;
	},
	setTransactionItemsMutation: (state, payload) => {
		state.transactionItemsState = payload;
	},
}

const actions = {
	fetchItemsAction() {
		return new Promise((resolve, reject) => {
			itemServices.getItems().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.error(error)
			})
		})
	},
	fetchItemCategoryAction() {
		return new Promise((resolve, reject) => {
			itemServices.getItemsCategory().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchItemCategoryAction ' + error)
			})
		})
	},
	fetchItemCategoryCountAction() {
		return new Promise((resolve, reject) => {
			itemServices.getItemsCategoryCount().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchItemCategoryCountAction ' + error)
			})
		})
	},
	fetchSelectedCategoryAction: ({commit}, payload) => {
		commit('setSelectedCategoryMutation',  payload )
	},
	fetchCartItemsAction() {
		return new Promise((resolve, reject) => {
			itemServices.getCartItems().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchCartItemsAction ' + error)
			})
		})
	},

	//Depreciated - Nov 3 2018 - Check This Function
	fetchCartTransAction() {
		return new Promise((resolve, reject) => {
			itemServices.getCartTrans().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchCartTransAction ' + error)
			})
		})
	},

	// computation
	fetchCartHeaderAction() {
		return new Promise((resolve, reject) => {
			itemServices.getHeaderCart().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.error('error in fetchCartHeaderAction' + error)
			})
		})
	},

	fetchItemFavoritesAction() {
		return new Promise((resolve, reject) => {
			itemServices.getFavorites().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.error(error)
			})
		})
	},

	clearCartItemsAction () {
		itemServices.clearCartTrans()
	},

	fetchTransactionAction() {
		return new Promise((resolve, reject) => {
			itemServices.getTransaction().then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchCartTransactionAction ' + error)
			})
		})
	},
	
	fetchTransactionitemsAction: ({commit}, payload) => {
		return new Promise((resolve, reject) => {
			itemServices.getTransactionItems(payload.id).then(response => {
				resolve(response);
			}, error => {
				reject(error);
				console.log('error fetchCartTransactionAction ' + error)
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
