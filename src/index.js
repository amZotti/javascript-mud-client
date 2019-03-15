// get references to the required stuff
var TelnetSocket, net, socket, tSocket;

const { username, password, host, port } = require("./secrets.js");

net = require("net");

({TelnetSocket} = require("telnet-stream"));

// create a Socket connection
socket = net.createConnection(port, host);

// decorate the Socket connection as a TelnetSocket
tSocket = new TelnetSocket(socket);

// if the socket closes, terminate the program
tSocket.on("close", function() {
  return process.exit();
});

// Output from mud
tSocket.on("data", function(buffer) {
	const output = buffer.toString("utf8");

	runTriggers(output);

  return process.stdout.write(output);
});


// Input to MUD
process.stdin.on("data", function(buffer) {
	const input = buffer.toString("utf8");	
  return tSocket.write(input);
});

const triggers = [
	{ trigger: /Please enter an account name:/g, input: username},
	{ trigger: /What is your password?/g, input: password },
];

function runTriggers(text) {
	triggers.forEach(({trigger, input}) => {
		if (text.match(trigger)) {
			send(input);
		}	
	});
}
	

function send(text) {
	tSocket.write(`${text}\n`);
}
