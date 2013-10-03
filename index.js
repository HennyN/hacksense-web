var amqp = require('amqp');

var connection = amqp.createConnection({
  host: 'amqp.hacklab',
  defaultExchangeName: 'events'  
});

connection.on('ready', function() {
  connection.queue('harrys-queue', {
      exclusive: true
    }, 
    function(q) {
      console.log("Queue created!");
      q.bind("events", '#');
      q.subscribe(function(msg, headers, deliveryInfo) {
        console.log("(" + deliveryInfo.routingKey + ") Message received: " + JSON.stringify(msg));
        console.log("Headers received: " + JSON.stringify(headers));
      });
  });
});
