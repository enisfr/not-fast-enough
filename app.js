const express = require('express');
const FastSpeedTest = require('fast-speedtest-api');
const env = require('dotenv').config();

const app = express();



app.get('/', (req, res, next) => {
	getSpeed().then(() => res.send('running'));
});

let fastSpeedTest = new FastSpeedTest({
	token: process.env.API_KEY,
	verbose: false,
	timeout: 10000,
	https: true,
	urlCount: 5,
	bufferSize: 8,
	unit: FastSpeedTest.UNITS.Mbps
});

async function getSpeed() {
	await fastSpeedTest.getSpeed().then(speed => {
		console.log(`Speed: ${speed} Mbps`);
		return speed;
	}).catch(e => {
		console.error(e.message);
	});
}

app.listen(3000);
