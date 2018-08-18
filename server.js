const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/Public'));

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`
	
	console.log(log);
	fs.appendFileSync('server.log', log + '\n');
	next();
});

//app.use((req, res, next) => {
//	res.render('maintainance.hbs');
//});

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) => {
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeNote: 'Welcome to the new Homepage'
	});
});

app.get('/about',(req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad',(req, res) => {
	res.send({
	errorMessage: 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});
