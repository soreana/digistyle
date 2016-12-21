var http = require('http');
var open = require('open');
var player = require('play-sound')(opts = {});

var options = {
    hostname: 'search.digistyle.com',
    path: '/api2/Data/GetCollection?collectionId=1&pageIndex=1&pageSize=10000',
    method: 'GET'
};
var counter = 1;


var requestHandler = function (res) {
    var data = "";
    console.log("counter is: " + counter);
    counter++;

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var obj;
        try {
            obj = JSON.parse(data);
        }catch (e){
            setTimeout(http.request(options,requestHandler).end(), 30000);
            return;
        }
        var temp;
        var find = false;
        for (var i = 0; i < obj.hits.hits.length; i++) {
            temp = obj.hits.hits[i];
            if (temp._source.MinPrice <= 10000 && temp._source.MinPrice > 0) {
                console.log(temp);
                find = true;
                open("http://www.digistyle.com/Product/" + temp._source.FaTitle.replace(' ', '-') + '-' + temp._id);
                player.play('1.mp3');
            }
        }
        if (!find) {
            setTimeout(http.request(options,requestHandler).end(), 10000);
        }
    });
};

setTimeout(http.request(options,requestHandler).end(), 1);
