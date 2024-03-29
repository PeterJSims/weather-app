const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDir = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Peter Sims'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Peter Sims'
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'Choose a city or zipcode and find your weather!',
		title: 'Help',
		name: 'Peter Sims'
	});
});
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide a location'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Please provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorText: 'Help article not found',
		name: 'Peter Sims'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorText: 'Page not found',
		name: 'Peter Sims'
	});
});

app.listen(port, () => {
	console.log(`Loaded on ${port}`);
});
