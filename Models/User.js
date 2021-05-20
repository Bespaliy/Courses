'use strict';

const fs = require('fs');
const path = require('path');

class User {
	constructor(login, password) {
		this.login = login;
		this.password = password;
	}

	static save = async user => {
		const fakeDbPath = path.join(__dirname, '..', 'db', 'db.json');
		const users = await User.getAll();
		users.push(user);
		return new Promise((resolve, reject) => {
			resolve(fs.writeFile(fakeDbPath, JSON.stringify(users),(err) => {
				if (err) reject(err);
				else resolve();
			})); 
		}); 
	}

	static getAll = () => {
		const fakeDbPath = path.join(__dirname, '..', 'db', 'db.json');
		return new Promise((resolve, reject) => {
			fs.readFile(fakeDbPath, (err, data) => {
				if (err) reject(err); 
				else resolve(JSON.parse(data));
			});
		}); 
	}
}

module.exports = User;
