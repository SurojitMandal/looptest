var loopback = require("loopback");
var app = require('../../server/server');
var async = require("async");
 
var ds = app.dataSources.db;
var aggregateModel = ds.getModel ('Aggregate');

// Hiding the existing remote methods.
aggregateModel.sharedClass.find('create',true).shared = false;
aggregateModel.sharedClass.find('upsert',true).shared = false;
aggregateModel.sharedClass.find('exists',true).shared = false;
aggregateModel.sharedClass.find('findById',true).shared = false;
aggregateModel.sharedClass.find('find',true).shared = false;
aggregateModel.sharedClass.find('findOne',true).shared = false;
aggregateModel.sharedClass.find('updateAll',true).shared = false;
aggregateModel.sharedClass.find('deleteById',true).shared = false;
aggregateModel.sharedClass.find('count',true).shared = false;
aggregateModel.sharedClass.find('updateAttributes',false).shared = false;

// Adding a new remote method "testMethod" on Model "Aggregate"
module.exports = function(Aggregate) {
	Aggregate.testMethod = function(cb) {

		function callRestService (serviceName, cb) {
			var searchResults = [];

			if(serviceName == 'Product') {
				var dsProduct = app.dataSources.wcsProductDS;
				var productModel = dsProduct.getModel('Product');

				productModel.getProductById('12129', function(err, Persons){
					if (err) {
						console.log("Error occurred: " + err);
						return;
					}
		        	searchResults.push(Persons);
		        	//searchResults.push("Alffrey");
		        	//console.log(searchResults);
		        	console.log("1: " + searchResults);
		        });

			} else if(serviceName == 'Category') {
				var dsCategory = app.dataSources.wcsProductDS;
				var categoryModel = dsCategory.getModel('Category');

				categoryModel.getCategoryById('10306', function(err, Categorys){
					if (err) {
						console.log("Error occurred: " + err);
						return;
					}
		        	searchResults.push(Categorys);
		        	//searchResults.push("George");
		        	//console.log(searchResults);
		        	console.log("2: " + searchResults);
		        });
			}

			console.log("3: " + searchResults);
			cb(null, searchResults);
		}

		async.parallel([
			function(cb) {
				callRestService('Product', cb);
			},

			function(cb) {
				callRestService('Category', cb);	
			}

		], 
		// Callback function
		function(err, results) {
			console.log("final: " + results.length);
			for(i=0;i<results.length;i++) {
	            console.log("result: " + results[i]);
	          }
			cb(null, results);
		})

	}

	Aggregate.remoteMethod(
		'testMethod',
		{
			returns: {arg:'Aggregate', type: 'Object'}
		}
	);
}
