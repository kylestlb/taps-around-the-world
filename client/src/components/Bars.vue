<template>
	<div v-for="beer in beers">
		{{beer.name}}
		{{beer.brewery}}
	</div>
	<h3>{{ title }}</h3>
</template>

<script>
import BeerStore from '../stores/BeerStore.js'

export default {
	name: 'bars',
	props: {
		title: 'rofl'
	},
	data () {
		return {
			label: "this is the home section",			
			beers: []
		}
	},
	route: {
		data ({ to }) {
			console.log('switching?');
			return BeerStore.fetchNewBeers().then( (response) => {
				console.log(response);
				this.beers = response.data ? response.data : [];
			})
		}
	}
}
</script>

