import { getString, setString } from 'tns-core-modules/application-settings'
import store from '@/store';
import axios from 'axios'
import * as global from "@/global"


export default class ItemServices {
	constructor() {
	}

	getNews(){
		return new Promise((resolve, reject) => {	
			axios.get(global.shareVar.baseUrl + 'news')
			.then(function (response) {				

				const obj = response.data;
				const items = Object.keys(obj || {}).map(key => ({
					id: obj[key].id,
					title: obj[key].title,
					summary: obj[key].summary,
					content: obj[key].content,
					thumb: obj[key].photo_thumbnail,
					image: obj[key].path_thumbnail,
					date: obj[key].created_at
				}));

				store.commit('setNewsMutation',items)
				resolve('resolve-getNews')
			})	
			.catch(error=>{
				global.log('getNews',error)
				reject(error)
			})	
		})
	}


}