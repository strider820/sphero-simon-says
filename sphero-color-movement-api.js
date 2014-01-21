var Cylon = require('cylon');
var http = require('http');
var someColor="orange";
var doMoveBad=0;
var doMoveGood=0;
 
http.createServer(function(req,res){
  console.log(req.url);
  switch(req.url){
    case '/red': someColor = 'red'; break;
    case '/green': someColor = 'green'; break;
    case '/yellow': someColor = 'yellow'; break;
    case '/blue': someColor = 'blue'; break;
    case '/black': someColor = 'black'; break;
    case '/good': doMoveGood = 1; break;
    case '/bad': doMoveBad = 1; break;
  }
  // if(req.url=='/index.html' || req.url=='/') {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('asdf');
  // someColor = 'yellow';
}).listen('1234');

Cylon.robot({
  name:"beam_me_up_spotty",
  // windows port: COM#, mine happens to be 6
  connection: { name: 'sphero', adaptor: 'sphero', port: 'COM6' },
  // mac port: /dev/*Sphero-*
  //connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-RGR-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },
 
  work: function(my) {
    var on = false;
    every((.5).second(), function() {

        my.sphero.setColor(someColor);
        someColor='black';
        // on = false;
      
      if(doMoveGood > 0){
        my.sphero.setColor("deeppink");
        after((.1).second(), function() {
            my.sphero.setColor("orange");
            after((.1).second(), function() {
                my.sphero.setColor("navy");
                after((.1).second(), function() {
                    my.sphero.setColor("green");
                });
            });
        });
        doMoveGood--;
      }
      if(doMoveBad > 0){
        my.sphero.roll(255, 60);
        my.sphero.setColor('red');
        doMoveBad--;
      }
    });
  }
});

 
// Tell Cylon we want it to spin up the API on port 4321
Cylon.api({host:'127.0.0.1',port: '4321'});
 
// Start up Cylon API server
Cylon.start();