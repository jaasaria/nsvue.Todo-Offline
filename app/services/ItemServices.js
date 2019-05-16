import { getString, setString } from 'tns-core-modules/application-settings'
import * as appSettings from "tns-core-modules/application-settings";
import Vue from 'nativescript-vue';
import * as global from "@/global"
import store from '@/store';
import axios from 'axios'

const headerCartKey = "headerCart";
const itemKey = "cart";
const taxValue = 12;

export default class ItemServices {

	getItems(){
		return new Promise((resolve, reject) => {	


			console.log('get item')

			const userId = store.state.auth.loginInfo.id
			const isLogged = store.state.auth.isLoginState

			const urlWithUser = global.shareVar.baseUrl + 'itemlist?withUser=true&userId=' + userId
			const urlWOutUser = global.shareVar.baseUrl + 'itemlist?withUser=false'

			// const urlWithUser = global.shareVar.baseUrl + 'items/user/' + userId
			// const urlWOutUser = global.shareVar.baseUrl  + 'items/user/9999999'

			console.log( 'login url info: ' + isLogged== true? urlWithUser : urlWOutUser)
			
			axios.get(isLogged== true? urlWithUser : urlWOutUser)
			.then(function (response) {				

				const obj = response.data;

				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].id,
					barcode: obj[key].barcode,
					code: obj[key].code,
					name: obj[key].name,
					category: obj[key].category,
					categoryColor: obj[key].categoryColor,
					image: obj[key].image,
					qty: 1,
					price: obj[key].price,
					total: obj[key].price,
					likes: obj[key].total_likes,
					description: obj[key].description,
					withLike: obj[key].withLike,
					withFavorite: obj[key].withFavorite,
				}));

				// const items = Object.keys(obj || {}).map(key => ({
				// 	id: obj[key].id,
				// 	code: obj[key].item_code,
				// 	name: obj[key].item_name,
				// 	category: obj[key].category.name,
				// 	image: obj[key].path_thumbnails,
				// 	price: obj[key].price,
				// 	likes: obj[key].total_likes,
				// 	description: obj[key].description,
				// 	userLike: obj[key].likes
				// }));

				console.log('item count: ' + items.length)
				if (items.length >= 0 ){
					store.commit('setItemsMutation',items)
				}
				resolve('resolveGetItems')

			})	
			.catch(error=>{
				// store.commit('setItemsMutation',[])
				global.log('itemservices getItem err',error)
				reject(error)
			})	
		})
	}

	getItemsCategory(){
		return new Promise((resolve, reject) => {	
			axios.get(global.shareVar.baseUrl + 'category')
			.then(function (response) {				

				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					name: obj[key].name
				}));
				let allCat = {"name":"All Category"} 
				let datas = items
				datas.splice(0, 0, allCat); 
				let names = datas.map(function(data) { 
					return data['name'];  			
				});
				store.commit('setCategoryMutation',names)
				resolve('resolve-getItemsCategory')
			})	
			.catch(error=>{
				global.log('itemservices getItemsCategory',error)
				reject(error)
			})	
		})
	}

	getItemsCategoryCount(){
		return new Promise((resolve, reject) => {	
			axios.get(global.shareVar.baseUrl + 'category/items')
			.then(function (response) {				
				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].id,
					name: obj[key].name,
					image: obj[key].path_thumbnail,
					items_count: obj[key].items_count
				}));
				store.commit('setCategoryItemCountMutation',items)


				// with all : used under search modal of categories
				let allCat = {
					"id":"999",
					"name":"All Category",
					"image":"",
					"items_count":"0",
				}
				var datas = JSON.parse(JSON.stringify( items ));
				datas.splice(0, 0, allCat);
				let names = datas.map(function(data) { 
					if(data['name'] == 'All Category'){
						return data['name'];  
						// return data['name'] + ' (' + datas.length + ')' ;  
					}else{
						return data['name'] + ' (' + data['items_count'] + ')' ; 
					}		
				});
				store.commit('setCategoryItemCountWithAllMutation',names)

				resolve('resolve-setCategoryItemCountMutation')
			})	
			.catch(error=>{
				global.log('itemservices getItemsCategory',error)
				reject(error)
			})	
		})
	}

	getCartItems(){
		return new Promise((resolve, reject) => {	
			const data = getString(itemKey)
			if(data){
				store.commit('setItemsCartMutation', data)
			}
			resolve('resolve getCartItems')
		})
	}
	getCartTrans(){
		return new Promise((resolve, reject) => {	
			const data = getString(headerCartKey)
			console.log('first load get car item: ' +  data )
			store.commit('setHeaderCartMutation', data)
			resolve('resolve getCartTrans')
		})
	}

	deleteCartItem(item){
		return new Promise((resolve, reject) => {	
			store.commit('deleteItemCartByFindIdMutation', item)
			this.computeHeader()
			resolve()
		})
	}	
	addCartItem(newCartItem){
		return new Promise((resolve, reject) => {	
			console.log('new cart ' + JSON.stringify(newCartItem))
			store.commit('addItemsCartMutation', newCartItem)
			this.computeHeader()
			resolve('resolve addCartItem')
		})
	}

	computeHeader(){
		let data = JSON.stringify(store.state.item.itemsCartState)
		setString(itemKey, data)
		this.getHeaderCart()
	}
	getHeaderCart(){
		return new Promise((resolve, reject) => {	

			let itemsCartState = store.state.item.itemsCartState
			let subtotal = 0
			let qtytotal = 0

			subtotal = itemsCartState.reduce(function(total, item){
				return total + Number(item.total);
			},0);

			qtytotal = itemsCartState.reduce(function(total, item){
				return total + Number(item.qty);
			},0);

			let tax = 0
			tax = subtotal * (taxValue / 100)
			let total = 0
			total = subtotal + tax 

			let header =  {
				qty: qtytotal,
				subtotal: subtotal,
				tax: tax,
				total: total
			}
			store.commit('setHeaderCartMutation', header)
			setString(headerCartKey, JSON.stringify(header))
			resolve('resolve getHeaderCart')

		})
	}
	clearCartTrans(){
		return new Promise((resolve, reject) => {	
			appSettings.remove(headerCartKey)
			appSettings.remove(itemKey)
			store.commit('clearCartItemsMutation')
			resolve(true)
		})
	}
	
	itemLike(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'items/users/like',
				data: {
					itemId: payload.itemId,
					userId: userId
				}
			})
			.then(function (response) {			
				console.log('success itemLike')
				resolve('resolve-itemLike')
			})	
			.catch(error=>{
				global.log('itemservices itemLike err',error)
				reject(error)
			})	
		})
	}

	itemDislike(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'delete',
				url: global.shareVar.baseUrl + 'items/' +  payload.itemId  + '/users/'  +  userId +  '/like',
			})
			.then(function (response) {				
				console.log('success itemDislike')
				resolve('resolve-itemDislike')
			})	
			.catch(error=>{
				global.log('itemservices itemDislike err',error)
				reject(error)
			})	
			
		})
	}

	getFavorites(){
		return new Promise((resolve, reject) => {	
			const userId = store.state.auth.loginInfo.id
			axios.get(global.shareVar.baseUrl + 'user/' +  userId + '/favorites')
			.then(function (response) {	

				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].id,
					name: obj[key].item_name,
					image: obj[key].path_thumbnails,
					likes: obj[key].total_likes,
				}));
				store.commit('setItemsFavoritesMutation',items)
				resolve('resolve-setItemsFavoritesMutation')
			})	
			.catch(error=>{
				global.log('itemservices setItemsFavoritesMutation',error)
				reject(error)
			})	
		})
	}
	
	deleteFavorites(item){ //this is like
		return new Promise((resolve, reject) => {	
			store.commit('deleteItemLikeByFindIdMutation', item)
			resolve()
		})
	}	

	deleteFavoritesHeart(item){
		return new Promise((resolve, reject) => {	
			store.commit('deleteItemFavoriteByFindIdMutation', item)
			resolve()
		})
	}	


	updateItemStatusById(payload){
		//FORMAT
		// let data = {
		// 	id: payload.item,
		// 	withLike: 0/1,
		// }						
		let index = store.getters.getItemIndexById(payload.id)
		let targetVal = store.getters.getItemDetailsById(payload.id)
		let itemState = store.state.item.itemsState;

		let newVal = {withLike: payload.withLike}
		let updateVal = Object.assign(targetVal, newVal)
		if (index){
			Vue.set(itemState, index, updateVal)
		}
	}
	updateItemFavoriteById(payload){			
		let index = store.getters.getItemIndexById(payload.id)
		let targetVal = store.getters.getItemDetailsById(payload.id)
		let itemState = store.state.item.itemsState;

		let newVal = {withFavorite: payload.withFavorite}
		let updateVal = Object.assign(targetVal, newVal)
		if (index){
			Vue.set(itemState, index, updateVal)
		}
	}
	

	checkItemIfAlreadyLike(id){
		let index = store.getters.getItemDetailsById(id)
		if (index.withFavorite == 1){
			return true 
		}else{
			return false
		}
	}

	checkItemIfAlreadyCart(id){
		let index = store.getters.getCartDetailsById(id)			
		if (index){
			return true 
		}else{
			return false
		}
	}

	postCart(){
		return new Promise((resolve, reject) => {	
			
			const userId = store.state.auth.loginInfo.id
			const headerData = store.state.item.headerCartState
			const obj = store.state.item.itemsCartState
			const detailsData = Object.keys( obj || {}).map(key => ({
				item_id: obj[key].id,
				qty: 1,
				price: obj[key].price,
				total: obj[key].total
			}));

			let payloadHead = {
				user_id: userId,
				qty: headerData.qty,
				subtotal: headerData.subtotal,
				tax: headerData.tax,
				total: headerData.total
			};

			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'order',
				data: {
					header: payloadHead,
					details: detailsData
				}
			})
			.then(function (response) {	
				const obj = response.data;
				resolve(true)
			})	
			.catch(error=>{
				global.log('postCart',error)
				reject(error)
			})	

		})
	}
	
	getTransaction(){
		return new Promise((resolve, reject) => {	
			const userId = store.state.auth.loginInfo.id
			axios.get(global.shareVar.baseUrl + 'orders/user/'+ userId)
			.then(function (response) {	

				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].id,
					transNo: obj[key].TransNo,
					date: obj[key].date_create,
					statusName: obj[key].status.name,
					statusColor: obj[key].status.color,
					subtotal: obj[key].subtotal,
					tax: obj[key].tax,
					totalQty: obj[key].total_qty,
					totalAmount: obj[key].total_amount,
				}));

				store.commit('setTransactionMutation',items)
				resolve('resolve-getTransaction')
			})	
			.catch(error=>{
				global.log('itemservices getTransaction',error)
				reject(error)
			})	
		})
	}
	getTransactionItems(transNo){
		return new Promise((resolve, reject) => {	
			axios.get(global.shareVar.baseUrl + 'order/items/'+ transNo)
			.then(function (response) {	

				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].item_id,
					name: obj[key].item.item_name,
					qty: obj[key].qty,
					price: obj[key].price,
					total: obj[key].total,
					image: obj[key].item.path_thumbnails,
				}));

				store.commit('setTransactionItemsMutation',items)
				resolve('resolve-getTransactionItems')
			})	
			.catch(error=>{
				global.log('itemservices getTransactionItems',error)
				reject(error)
			})	
		})
	}







	
	itemFavorite(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'items/users/favorite',
				data: {
					itemId: payload.itemId,
					userId: userId
				}
			})
			.then(function (response) {			
				console.log('success item favorite')
				resolve('resolve-itemLike')
			})	
			.catch(error=>{
				global.log('itemservices item favorite err',error)
				reject(error)
			})	
		})
	}

	itemUnFavorite(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'delete',
				url: global.shareVar.baseUrl + 'items/' +  payload.itemId  + '/users/'  +  userId +  '/favorite',
			})
			.then(function (response) {				
				console.log('success unfavorite')
				resolve('resolve-itemDislike')
			})	
			.catch(error=>{
				global.log('itemservices item unfavorite err',error)
				reject(error)
			})	
			
		})
	}



}