var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html');

var SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimeter: '\r\n'
})

//necesitas poner la locacion del port del arduino 
var port = new SerialPort('',{
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

parser.on('data', function(data){
    console.log(data);

    io.emit('data', data);
});



var app = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(index);
})
var io = require('socket.io').listen(app);
io.on('connection', function(data){
    console.log('Node.js is listening');
})

/*si sale un error entonces es porque esta abierto el monitoreo en 
el arduino y como este usa el mismo puerto que le pusiste pues el 
programa dice nel solo se puede usar una cosa en ese puerto
PARA LA FUN PARSER.ON*/
parser.on('data', function(data){
    console.log(data);

    io.emit('data', data);
});



app.listen(3000);