<template>
	<div v-for="beer in beers">
		{{beer.name}}
		{{beer.brewery}}
	</div>
	<h3>{{ title }}</h3>
</template>

<script>
export default {
	props: {
		beers: Array,
		title: 'rofl'
	},
	data () {
		return {
			label: "this is the home section"
		}
	}
}
</script>

