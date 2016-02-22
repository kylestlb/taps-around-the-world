<template>
	<div class="pure-menu pure-menu-horizontal">
		<ul class="pure-menu-list">
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/bars'}">beer_zone</a></li>			
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/bars'}">bars</a></li>
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/profile'}">profile</a></li>        
			<li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/about'}">about</a></li>                

		</ul>

		<ul class="pure-menu-list right-list">
			<li class="pure-menu-item login-button"><a class="pure-menu-link login-button" v-link="{ path: '/login'}">login / join</a></li>
		</ul>
	</div>
</template>

<script>

export default {
	name: 'navigation'
}

</script>

<style>
.right-list {
	float:right;
}
.login-button {
	float:right;
}
</style>