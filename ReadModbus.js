let ModbusRTU = require("modbus-serial");
let client = new ModbusRTU();
 
// open connection to a tcp line
client.connectTCP("192.168.3.100", { port: 502 });
client.setID(1);
 
// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.

function readVolts(){
    return new Promise(function(resolve,reject){
        client.readHoldingRegisters(13312, 3, function(err, data) {

            let volts = [];
            data.data.forEach(measurement => {
                volts.push(measurement*0.1);
            });

            resolve(volts);
        });
    });
}
function readAmpere(){
    return new Promise(function(resolve,reject){
        client.readHoldingRegisters(13318, 3, function(err, data) {

            let ampere= [];
            data.data.forEach(measurement => {
                ampere.push(measurement*0.1);
            });

            resolve(ampere);
        });
    });
}
function readkWh(){
    return new Promise(function(resolve,reject){
        client.readHoldingRegisters(13324, 3, function(err, data) {

            let kWh = [];
            data.data.forEach(measurement => {
                kWh.push(measurement*0.001);
            });

            resolve(kWh);
        });
    });
}

module.exports.readVolts = readVolts;
module.exports.readAmpere = readAmpere;
module.exports.readkWh = readkWh;