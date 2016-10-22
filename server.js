var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var shopifyAPI = require('shopify-node-api');

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Static files
app.use(express.static(__dirname + '/public')); 

var Shopify = new shopifyAPI({
  shop: 'filestack-shopify', // MYSHOP.myshopify.com
  shopify_api_key: '468e6675ee7c54e9872ca87711a5706e', // Your API key
  access_token: '679c872864aa1fab6aea5fe9774a8328' // Your API password
});


app.route('/product')
	.get(function(req, res) {
		Shopify.get('/admin/products.json', function(err, data, headers){
		  res.json(data);
		});
		
	})
	.post(function(req, res) {
		var product = req.body;
		Shopify.post('/admin/products.json', product, function(err, data, headers){
		  res.json(data);
		});
	})
app.listen(port);
console.log('App listening on port ' + port);