var loopback = require("loopback");
var app = require('../../server/server');
var fs = require("fs");
 
var ds = app.dataSources.wcsProductDS;
var fileListModel = ds.createModel ('Items',{},{base:loopback.Model});
/*console.log(fileListModel.getProductById);*/
console.log(fileListModel);
 
module.exports=fileListModel;
/*var queryParam = {
    arg1: 'Modified desc',
    arg2: '5'
};
 
var fileIDParam = {
        fileID: '8'
};
 
fileListModel.getFileList = function(orderBy, top, cb) {
        var file = __dirname + '/documentList.json';
        fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          console.log('Error: ' + err);
          cb(err);
        } else {
          data = JSON.parse(data);
          cb(null, data);
        }
   });
};
 
fileListModel.getFileList.shared = true;
fileListModel.getFileList.accepts = [{arg: 'orderBy', type: 'string', http: {source: 'query'}},
{arg: 'top', type: 'number', http: {source: 'query'}}];
fileListModel.getFileList.returns = [{arg: 'data', type: 'array', root: true} ];
fileListModel.getFileList.http = {verb: 'get', path: '/'};
 */
app.model(fileListModel);