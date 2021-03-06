var express = require('express');
var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main'});
var app = express();
var fortune = require('./lib/fortune.js');

app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.text === '1';
	next();
})

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.render('home');
});


app.get('/about', function(req, res) {
	var randomFortune = fortune.getFortune();
	res.render('about',{fortune: randomFortune});
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('The express is starting at ' + app.get('port') + ' enjoy it');
});