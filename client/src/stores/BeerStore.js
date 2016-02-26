import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import Vue from 'vue'

const store = new EventEmitter()
const API_URL = 'http://localhost:8080/api'
const beersCache = Object.create(null)
const beersPerPage = store.beersPerPage = 30

export default store

store.fetchNewBeers = () => {
	return new Promise((resolve, reject) => {
		console.log('local storage inside fetch: ');
		console.log(localStorage.getItem('token'));
		var payload = localStorage.getItem('token') !== "null" && localStorage.getItem('token') !== '' ? 
		{
			access_token: localStorage.getItem('token'),
		} :
		{};
		console.log(payload);
		Vue.http.get(API_URL + '/beer', payload).then(function(response) {
			resolve(response);
			// this.$set('beers', response.data);
			// this.$set('title', 'After request');		
		});
	});
}