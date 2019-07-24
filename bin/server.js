// Main server script for bootstrapping redive-flora.com
const initApp = require('./bootstrap_task/init_app');
const initDB = require('./bootstrap_task/init_db');

async function bootServer() {
	const tasks = [
		initApp(),
		initDB()
	];
	await Promise.all(tasks);
}

bootServer()
	.then()
	.catch((err) => {
		console.log('err:', err);
		console.log(err.stack);
	});
