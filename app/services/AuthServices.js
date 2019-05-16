import axios from 'axios'
import store from '@/store';
import * as global from "@/global"

export default class AuthServices {

	signIn(user){
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'login',
				data: {
					email: user.email,
					password: user.password
				}
			})
			.then(function (response) {				
				if (response.data.isActive === 0 ){
					reject({title: 'notActive',description: 'User is not yet activated.'})	
				}
				global.setToken(response.data.access_token)
				// global.setUserInfo(JSON.stringify(response.data))
				resolve()
			})	
			.catch(error=>{
				global.log('authservice signIn err',error)
				reject(error)
			})	

		})
	}
	register(user){

		// console.log('user registration: ' + JSON.stringify(user))

		return axios({
			method: 'post',
			url: global.shareVar.baseUrl + 'signup',
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				password_confirmation: user.password_confirmation
			}
			})
			.then(function (response) {
				console.log(response.data)
			})
			.catch((err)=>{
				global.log('login register',err)
			})	
		}

	signOut(){
		return new Promise((resolve, reject) => {
			global.setToken('')
			store.commit('setLogOutMutation')
			resolve()
		})
	}

	getAuthData(){
		return (new Promise((resolve, reject) => {		
			let token = global.getToken()

			// console.log('checking getAuthData: ' + token)

			if (token) {	
				axios({
					method: 'get',
					url: global.shareVar.baseUrl + 'user',
					headers: {Authorization : 'Bearer ' + token}
				})
				.then(function (response) {

					// console.log('resolve1 getAuthData')

					global.setUserInfo(JSON.stringify(response.data))
					store.commit('setLoginMutation', response.data)

					// console.log('resolve2 getAuthData')

					resolve(response.data);
				})
			}else{
				console.log('reject getAuthData')
				resolve(false);
			}
		}));
	}

	getAuthDataNoConnection(){
		return (new Promise((resolve, reject) => {		
			let token = global.getToken()
			if (token) {	
				let data = global.getUserInfo();
				if (data) {
					store.commit('setLoginMutation', JSON.parse(data))
				}
			}
		}));
	}

	getImage(){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'get',
				url: global.shareVar.baseUrl + 'user/avatar/' + userId,
			})
			.then(function (response) {			
				store.commit('getImageMutation', response.data)
				resolve()
			})	
			.catch(error=>{
				global.log('getImage err',error)
				reject(error)
			})	
		})
	} 




	getPostHeader() {
    return {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
	}
	getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": this.appUserHeader,
    }
	}
	





}