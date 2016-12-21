var request = require('request');
var http = require('http');
var fs = require("fs");

var data = fs.readFileSync('input.txt');
// console.log("Synchronous read: " + data.toString());

  // An object of options to indicate where to post to
  var post_options = {
      host: 'atl-dev-pr-01.ad.mgage.io',
      port: '8080',
      path: '/a2w_preRouter/a2w_xmlApiRouter',
      method: 'POST',
      headers: {
          'Content-Type': 'text/xml',
          'Authorization': 'Basic Mm5vdGlmeToybm90aWZ5'
      }
  };


  function sendRequest(post_options){
      // Set up the request
      console.log('sending');
      var post_req = http.request(post_options, function(resp) {
          resp.on('data', function(chunk){
              //do something with chunk
              // console.log('chunk');
              var out = chunk.toString('utf8');
              // console.log(out);
              var date = new Date();
              var filename = date.getMilliseconds().toString();
              fs.writeFile( filename + '.txt', out,  function(err) {
                  if (err) {
                      return console.error(err);
                  }

                  console.log("Data written successfully!");
                  console.log("Let's read newly written data");
              });

          });
      }).on("error", function(e){
          console.log("Got error: " + e.message);
      });

      post_req.write(data);
      post_req.end();


  }

    for(var i=0;i<10;i++){
        sendRequest(post_options);
    }

