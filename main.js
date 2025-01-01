const AbletonLink = require('abletonlink');
const { log } = require('console');
const osc = require('osc');
const readline = require('readline');

// Default values
let speedmasterId = 1;
let receiverIpAddress = "127.0.0.1";
let receiverPort = 8000;

// Create a new Ableton Link instance
const link = new AbletonLink();

// Create an OSC UDP Port
let udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 8001,
    remoteAddress: receiverIpAddress,
    remotePort: receiverPort
});

// Open the OSC UDP Port
udpPort.open();

// Function to send BPM over OSC
function sendBPM(masterId, bpm) {
    udpPort.send({
        address: "/cmd",
        args: [
            {
                type: "s",
                value: "Master 3." + masterId + " At BPM " + bpm
            }
        ]
    });
}

// Setup readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
function promptUser() {
    rl.question('Enter command (or help): ', (command) => {
        const [action, value] = command.split(' ');

        switch (action) {
            case 'set':
                if (value === 'id') {
                    rl.question('Enter new speedmaster ID: ', (id) => {
                        speedmasterId = parseInt(id, 10);
                        console.log(`Speedmaster ID set to ${speedmasterId}`);
                        promptUser();
                    });
                } else if (value === 'ip') {
                    rl.question('Enter new receiver IP address: ', (ip) => {
                        receiverIpAddress = ip;
                        udpPort.options.remoteAddress = receiverIpAddress;
                        console.log(`Receiver IP address set to ${receiverIpAddress}`);
                        promptUser();
                    });
                } else if (value === 'port') {
                    rl.question('Enter new receiver port: ', (port) => {
                        receiverPort = parseInt(port, 10);
                        udpPort.options.remotePort = receiverPort;
                        console.log(`Receiver port set to ${receiverPort}`);
                        promptUser();
                    });
                } else {
                    console.log('Invalid command');
                    promptUser();
                }
                break;
            case 'start':
                console.log('Speedmaster: ' + speedmasterId);
                console.log('Sending OCS to: ' + receiverIpAddress + ":" + receiverPort);
                // Listen for changes in Ableton Link
                link.startUpdate(500, (beat, phase, bpm) => {
                    sendBPM(speedmasterId, bpm);
                });
                console.log('Listening and sending...');
                promptUser();
                break;
            case 'stop':
                link.stopUpdate();
                console.log('Stopped listening and sending.');
                promptUser();
                break;
            case 'exit':
                link.stopUpdate();
                console.log('Stopped listening and sending.');
                rl.close();
                process.exit(0);
                break;
            case 'help':
                console.log('Commands:');
                console.log('set id - Set speedmaster ID');
                console.log('set ip - Set receiver IP address');
                console.log('set port - Set receiver port');
                console.log('start - Start listening and sending BPM');
                console.log('stop - Stop listening and sending BPM');
                console.log('exit - Exit the program');
                promptUser();
                break;
            default:
                console.log('Invalid command');
                promptUser();
                break;
        }
    });
}

// Start prompting user for input
promptUser();