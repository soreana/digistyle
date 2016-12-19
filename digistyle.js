var http = require('http');
var open = require('open');

var options = {
    hostname: 'search.digistyle.com',
    path: '/api2/Data/GetCollection?collectionId=1&pageIndex=1&pageSize=10000',
    method: 'GET'
};

http.request(options, function (res) {
    var data = "";

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var obj = JSON.parse(data);
        var temp;
        for (var i = 0; i < obj.hits.hits.length; i++) {
            temp = obj.hits.hits[i];
            if (temp._source.MinPrice < 10000 && temp._source.MinPrice > 0) {
                console.log(temp);
                open("http://www.digistyle.com/Product/" + temp._source.FaTitle.replace(' ', '-') + '-' + temp._id);
            }
        }
    });
}).end();