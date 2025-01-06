require('dotenv').config();
const AbletonLink = require('abletonlink');
const { log } = require('console');
const osc = require('node-osc');

// Load values from .env file
// Network
let ipAddress = process.env.IP_ADDRESS || '127.0.0.1';
let port = process.env.PORT || 8000;
// BPM Changes
let send_BPM = process.env.SEND_BPM || true;
let BPM_command = process.env.BPM_COMMAND || 'Master 3.1 At BPM {bpm}';
// Beat changes
let send_phase = process.env.SEND_PHASE || true;
let phase_command = process.env.PHASE_COMMAND || 'Go Macro "BPM BEAT {phase}"';
// Other
let logging = process.env.LOGGIN || false;
let interval = process.env.INTERVAL || 10;

log('Starting Ableton Link to OSC bridge...\n');
log('Configuration:');
log('\n--------------- Network ---------------');
log('IP address:              ' + ipAddress);
log('Port:                    ' + port);
log('\n------------- BPM changes -------------');
log('Send changes:            ' + send_BPM);
log('Command:                 ' + BPM_command);
log('\n-------- Phase (beat) changes ---------');
log('Send changes:            ' + send_phase);
log('Command:                 ' + phase_command);
log('\n---------------- Other ----------------');
log('Refresh rate:            ' + interval);
log('Logging:                 ' + logging);
log('\n')

// Create a new Ableton Link instance
const link = new AbletonLink();

// Create an OSC client
let oscClient = new osc.Client(ipAddress, port);

function replacePlaceholders(template, replacements) {
    return template.replace(
        /{(\w+)}/g, 
        (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
            replacements.hasOwnProperty(placeholderWithoutDelimiters) ? 
                replacements[placeholderWithoutDelimiters] : placeholderWithDelimiters
    );
}

// Function to send command over OSC
function sendOSCCommand(command, variables) {
    let cmd = replacePlaceholders(command, variables);
    oscClient.send('/cmd', cmd, () => {
        if(logging) {
            log('GrandMA command sent: ' + cmd);
        }
    });
}

let lastPhase = 0;
let lastBPM = 0;
// Listen for changes in Ableton Link
link.startUpdate(interval, (beat, phase, bpm) => {
    if(bpm !== lastBPM && send_BPM) {
        sendOSCCommand(BPM_command, { bpm: bpm });
    }
    lastBPM = bpm;
    phase = Math.floor(phase);
    if(phase !== lastPhase && send_phase) {
        sendOSCCommand(phase_command, { phase: parseInt(phase) + 1 });
    }
    lastPhase =  phase;
    
});

log('Listening to Ableton Link...')