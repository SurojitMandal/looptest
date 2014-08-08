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

module.exports = function(Aggregate) {
	Aggregate.testMethod = function(cb) {

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
			console.log("final: " + results);
			cb(null, results);
		})

		function callRestService (serviceName, cb) {
			searchResults = [];

			if(serviceName == 'Product') {
				var dsProduct = app.dataSources.wcsProductDS;
				var productModel = dsProduct.getModel('Product');

				productModel.getProductById('12129', function(err, Persons){
					if (err) {
						console.log("Error occurred: " + err);
						return;
					}
		        	searchResults.push(Persons);
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
		        	console.log("2: " + searchResults);
		        });
			}

			console.log("3: " + searchResults);
			cb(null, searchResults);
		}

	}

	Aggregate.remoteMethod(
		'testMethod',
		{
			returns: {arg:'Aggregate', type: 'object'}
		}
	);
}
