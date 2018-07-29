const readline = require('readline');

const r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

r1.question('what do you think of Node.js\n', (answer) => {
	console.log(`value feedback: ${answer}`);
	r1.close();
})