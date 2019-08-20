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
			let daily = body.daily.data[0];
			callback(
				undefined,
				`${daily.summary} It is currently ${Math.ceil(current.temperature)}° with a ${Math.round(
					current.precipProbability
				)}% chance of precipitation. Today's high will be ${Math.ceil(
					daily.temperatureHigh
				)}° with a low of ${Math.ceil(daily.temperatureLow)}°.`
			);
			console.log();
		}
	});
};

module.exports = forecast;
