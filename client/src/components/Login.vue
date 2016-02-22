<template>
	<form v-on:submit="submitForm" class="pure-form pure-form-aligned">
		<fieldset>
			<div class="pure-controls login-mode">
				<button v-bind:class="[pureButton, loginMode ? activeButton : '']" v-on:click="changeMode(true)">login</button>
				<button v-bind:class="[pureButton, loginMode ? '' : activeButton]" v-on:click="changeMode(false)" class="pure-button pure-button-active">join</button>			
			</div>
			<div v-if="!loginMode" class="pure-control-group">
				<label>name</label>
				<input v-model="name" type="text" placeholder="name"></input>
			</div>
			<div class="pure-control-group">
				<label>email</label>
				<input v-model="email" type="text" placeholder="you@somewhere.com" required></input>
			</div>		
			<div class="pure-control-group">
				<label>password</label>
				<input v-model="password" type="password" required></input>
			</div>						
			<div v-if="!loginMode" class="pure-control-group">
				<label>repeat password</label>
				<input v-model="passwordRepeat" type="text"></input>
			</div>			
			<div class="pure-controls">
				<button type="submit" class="pure-button pure-button-primary">Go</button>
			</div>
		</fieldset>
	</form>
				<button v-on:click="addbeer" type="submit" class="pure-button pure-button-primary">add beer</button>	
				<button v-on:click="logout" type="submit" class="pure-button pure-button-primary">logout</button>					
</template>

<script>
import validator from 'validator';
import { API_URL } from '../config';
export default {
	data ()  {
		return {
			loginMode: true,
			activeButton: 'pure-button-primary',
			pureButton: 'pure-button',
			password: '',
			passwordRepeat: '',
			email: '',
			name: ''
		}
	},
	methods: {
		changeMode(mode) {
			this.loginMode = mode;
		},
        submitForm(event) {
            if (this.loginMode) {
                this.$http.post(API_URL + '/login', {
                    username: this.email,
                    password: this.password
                }).then((response) => {
                	// Success
                    console.log(response);
                    console.log(response.headers());
                }, (response) => {
                	// Error
                    console.log(response);
                });
            } else {
            	this.$http.post(API_URL + '/user', {
            		username: this.email,
            		password: this.password
            	}).then((response) => {
            		console.log('success!');
            		console.log(response);
            	}, (response) => {
            		console.log('failure!');
            		console.log(response);
            	});
            }
},        addbeer(event) {
            this.$http.post(API_URL + '/beer', {
                name: 'Bud',
                brewery: 'Bud'
            }, {
                xhr: {
                	withCredentials: true
                }
            }).then((response) => {

                    console.log(response);
        	}, (response) => {

        	});
        },
        logout(event) {
        	this.$http.post(API_URL + '/logout'
        	).then((response) => {
        		console.log(response);
        	}, (response) => {
        		console.log(response);
        	});
        }        
	}
}
</script>
<style>
.login-mode {
	padding: 8px;
}
</style>