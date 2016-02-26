export default {
	setState(val) {
		this.state.loggedIn = val;
		console.log(this.state);
	},
	state: {
		loggedIn: false
	}
}