const { username, password } = require("./secrets.js");

export const triggers = [
	{ trigger: /Please enter an account name:/g, input: username},
	{ trigger: /What is your password?/g, input: password },
];

export default triggers;
