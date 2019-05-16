import * as global from "@/global"
import store from '@/store';
import axios from 'axios'

export default class BackendService {

  checkConnection(){
		return new Promise((resolve, reject) => {	
			axios.get(global.shareVar.baseUrl + 'check/connection' )
			.then(function (response) {	
				
				let data = response.data
				if (data.connection){
					store.commit('setDBConnectionMutation',true)
					resolve(response)
				}else{
					store.commit('setDBConnectionMutation',false)
					reject(error)
				}

			})
			.catch((error) => {
				console.log('no connecton, IP is : ' + global.shareVar.baseUrl + 'check/connection')
				console.log('error : ' + error)
				console.log('error : ' + error.response )
				console.log('error : ' + JSON.stringify(error))

        store.commit('setDBConnectionMutation',false)
				reject(error)
			})	
		})
	}

  // get token() {
  //   console.log('GETTING TOKEN: ' + getString(tokenKey))
  //   return getString(tokenKey);
  // }
  // set token(newToken) {
  //   setString(tokenKey, newToken);
  //   console.log('TOKEN SET TO: ' + newToken)
  // }




}