import createUser = require("./users/create");
import authUser = require("./users/authenticate");
import createSession = require("./createSession");
import verifyToken = require("./verifyToken");
import isStoredToken = require("./isStoredToken");
import AuthApi = require('../../index.d.ts');

export function register(user: AuthApi.User) {
	return createUser(user);
}

export function login(username: string, password: string) {
	return authUser(username, password)
		.then(token => createSession(username, token));
}

export function verify(token: string) {
	return verifyToken(token)
		.then(() => isStoredToken(token))
}