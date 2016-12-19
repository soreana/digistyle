var http = require('http');
var open = require('open');

var options = {
    hostname: 'search.digistyle.com',
    path: '/api2/Data/GetCollection?collectionId=1&pageIndex=1&pageSize=10000',
    method: 'GET'
};

var req = http.request(options, function (res) {
    var data = "";

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var obj = JSON.parse(data);
        // console.log(obj.hits.hits[0]);
        // console.log(obj.hits.hits[0]._source);
        // console.log(obj.hits.hits[0]._source.MinPrice);

        // var temp = obj.hits.hits[0];
        // open("http://www.digistyle.com/Product/"+temp._source.FaTitle.replace(' ', '-')+'-'+temp._id);
        var temp;
        for (var i = 0; i < obj.hits.hits.length; i++) {
            temp = obj.hits.hits[i];
            if (temp._source.MinPrice < 10000 && temp._source.MinPrice > 0) {
            // if (temp._source.MinPrice == 1710000 ) {
                console.log(temp);
                open("http://www.digistyle.com/Product/" + temp._source.FaTitle.replace(' ', '-') + '-' + temp._id);
            }
        }
    });
}).end();

