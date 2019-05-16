import axios from 'axios'
import store from '../store';
import * as global from "@/global"

export default class UserServices {

	getUser(user){
		return axios({
			method: 'post',
			url: global.shareVar.baseUrl + 'login',
			data: {
				email: user.email,
				password: user.password
			}
		})
		.then(function (response) {
			global.setToken(response.data.access_token)
			store.commit('setLoginMutation', response.data)
		})
	}


	
	updateProfile(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'user/profile',
				data: {
					name: payload.name,
					bio: payload.bio,
					address: payload.address,
					birthday: payload.birthday,
					userId: userId
				}
			})
			.then(function (response) {			
				console.log( JSON.stringify(response.data))
				resolve(true)
			})	
			.catch(error=>{
				global.log('updateProfile err',error)
				reject(error)
			})	
		})
	}
	

	updatePassword(payload){
		return new Promise((resolve, reject) => {	

			const userId = store.state.auth.loginInfo.id
			axios({
				method: 'post',
				url: global.shareVar.baseUrl + 'user/password',
				data: {
					oldPassword: payload.oldPassword,
					newPassword: payload.newPassword,
					userId: userId
				}
			})
			.then(function (response) {		
				console.log( JSON.stringify(response.data))
				resolve('updatePassword')
			})	
			.catch(error=>{
				global.log('updatePassword err',error)
				reject(error)
			})	
		})
	}




	getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": this.appUserHeader,
    }
	}
	





}