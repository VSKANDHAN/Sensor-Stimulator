function humidityData() {
    let getTime = new Date().toISOString();

    let humidity = Math.random() * (100 - 20) + 20;  

    let getHumidity = `${humidity.toFixed(2)}%`;

    return {
        time: getTime,
        humidity: getHumidity
    };
}

module.exports = humidityData;
