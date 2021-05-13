'use strict';


module.exports = obj => {

	obj = JSON.parse(obj);
	console.log(obj);
	class User {
	constructor(login, password) {
		this.login = login;
		this.password = password;
	}
}
}