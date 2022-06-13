const dgram = require('dgram');
const net = require('net');
var tcpserver = net.createServer();

var musicians = []


// TCP server 
tcpserver.on('connection', (conn) => {
    conn.write(JSON.stringify(
        musicians
    ));
    conn.close();
});

tcpserver.listen(2205, () => {    
  console.log('server listening to %j', tcpserver.address());  
});

// setInterval(()=>{ /* Delete dead musicians */ }, 1000);

// TCP server end



const protocol = {
    PROTOCOL_PORT: 5000,
    PROTOCOL_MULTICAST_ADDRESS: "239.255.22.5"
};

/* 
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
 */
const s = dgram.createSocket('udp4');


s.on("listening", function () {
    var address = s.address();
    console.log("server listening " +
        address.address + ":" + address.port);
});

/* 
 * This call back is invoked when a new datagram has arrived.
 */
s.on('message', (msg, source) => {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    var musician = JSON.parse(msg);
    musicians.push(musician);
});


s.bind(protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, () => {
    console.log("Joining multicast group");
    s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});
