// We use a standard Node.js module to work with UDP
const dgram = require('dgram');
const { v4: uuid } = require('uuid');

const Chance = require('chance');
var chance = new Chance();

// Let's create a datagram socket. We will use it to send our UDP datagrams
const s = dgram.createSocket("udp4");

const protocol = {
    PROTOCOL_PORT: 5000,
    PROTOCOL_MULTICAST_ADDRESS: "239.255.22.5"
};

const INSTRUMENTS = {
    piano: "ti-ta-ti",
    trumpet: "pouet",
    flute: "trulu",
    violin: "gzi-gzi",
    drum: "boum-boum"
};

const musician = {
    uuid: uuid(),
    instrument: chance.pickone(Object.keys(INSTRUMENTS)),
    activeSince: new Date()
};

// Create a measure object and serialize it to JSON
var payload = JSON.stringify(musician);

// Send the payload via UDP (multicast)
var message = Buffer.from(payload);  // new Buffer is deprecated
console.log(message);
setInterval(() =>{
    s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
        (/*err, bytes*/) => {
            console.log("Sending payload: " + payload + " via port " + s.address().port);
        }
    );
}, 2000);