function EnergyMeterData() {
    // Get current time
    let getTime = new Date().toISOString();

    // Generate random values for energy meter parameters
    let voltage = Math.random() * (235 - 220) + 220; // Voltage between 200V and 250V
    let current = Math.random() * (20 - 5) + 5; // Current between 5A and 20A
    let powerFactor = Math.random(); // Power factor between 0 and 1
    let frequency = Math.random() * (60 - 50) + 50; // Frequency between 50Hz and 60Hz

    // Construct strings for the parameters
    let getVoltage = `${voltage.toFixed(2)}V`;
    let getCurrent = `${current.toFixed(2)}A`;
    let getPowerFactor = powerFactor.toFixed(2);
    let getFrequency = `${frequency.toFixed(2)}Hz`;

    // Return an object with energy meter parameters
    return {
        time: getTime,
        voltage: getVoltage,
        current: getCurrent,
        powerFactor: getPowerFactor,
        frequency: getFrequency
    };
}

module.exports = EnergyMeterData;
