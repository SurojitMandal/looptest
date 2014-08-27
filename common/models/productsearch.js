var request = require('request');
var app = require('../../server/server');

module.exports = function(ProductSearch){ 
    ProductSearch.findByIds = function(ids, cb){ 
       uri = 'http://localhost/search/resources/store/10001/productview/byIds?';
       for(var i=0; i < ids.length; i++){
            console.log('p=',ids[i]);
            uri += 'id='+ids[i]+'&';
        }
        uri = uri.substring(0, uri.length-1);
        console.log(uri); 
        request.get({
            url: uri,
            method: 'GET',
        }, function(err, response) {
            if (err) console.error(err);
            // console.log('Result',response);
            cb(null, JSON.parse(response.body));
        });
    }

    ProductSearch.remoteMethod('findByIds', 
        { 
            returns: {arg: 'ProductSearch', type: 'JSON'},
            http: {path: '/findByIds', verb: 'get'},
            accepts: {arg: 'ids', type: 'array'}
        });
}


