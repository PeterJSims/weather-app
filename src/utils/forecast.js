const request = require('request');

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/bebf5c8c578c75a9771e8e1c52950710/${lat},${long}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect');
		} else if (body.error) {
			callback('Unable to find location. Try another search.');
		} else {
			let current = body.currently;
			callback(
				undefined,
				`${body.daily.data[0]
					.summary} It is currently ${current.temperature} degrees celcius with a ${current.precipProbability}% chance of precipitation.`
			);
			console.log();
		}
	});
};

module.exports = forecast;
