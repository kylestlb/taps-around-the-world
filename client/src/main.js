import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Bars from './components/Bars.vue'
import Profile from './components/Profile.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.replace = false;

export var router = new VueRouter()

router.map({
	'/bars': {
		component: Bars
	},
	'/profile': {
		component: Profile
	},
	'/about': {
		component: About
	},
	'/login': {
		component: Login
	}			
});

router.redirect({
	'*': '/bars'
});

router.start(App, '#app-container')
