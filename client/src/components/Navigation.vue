<template>
	<div class="pure-menu pure-menu-horizontal">
		<a v-link="{ path: '/bars' }" class="pure-menu-heading pure-menu-link">BEER_ZONE</a>
		<ul class="pure-menu-list">
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/bars'}">BARS</a></li>
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/profile'}">PROFILE</a></li>        
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/about'}">ABOUT</a></li>                
		</ul>
	</div>
</template>

<script>

export default {
	name: 'navigation'
}

</script>