
console.log(axios);
let addbtns=document.getElementsByClassName('addbtn')
let sensorTab=document.getElementById('sensorTab')
let addbtn=[...addbtns]
let tempconnectState=false;
let energyconnectState=false;
let humidconnectState=false;
addbtn.forEach(element => {
    element.addEventListener('click',(e)=>{
        let id=e.target.id
        console.log(id);
        let sensorName;
        let sensorImage;
        let deviceData;
        switch(id){
            case 'temperature':{
                sensorName='Temperature Sensor'
                sensorImage='temperatureSensor.png'
                deviceData=`<ul>
                <li id='temp'></li>
                <li id='tempTime'></li>
          
                </ul>`
                break;
            }
            case 'energryMeter':{
                sensorName='Energy Meter'
                sensorImage='EnergryMeter.png'
                deviceData=`<ul id='energyMeterData'>
        
                </ul>`
                break;
            }
            case 'humidity':{
                sensorName='Humidity Sensor'
                sensorImage='humiditySensor.png'
                deviceData=`<ul id='humidityData'>
              
          
                </ul>`
                break;
            }
        }
        let selectedSensor=document.createElement('div')
        selectedSensor.classList.add('selectedSensor')
        selectedSensor.innerHTML=`  
        <div class="sensor">
    <figure>
        <img src="${sensorImage}" alt="">
    <figcaption>${sensorName}</figcaption>
    </figure>
     <a href="#" class="button connect" id="${id}Connect">Connect</a>
     <a href="#" class="button disconnect" id="${id}Connect">DisConnect</a>
     <h4 id='${id}status' class='status'>Not Connected</h4>
        </div>
    <div class="sensorValue">
    <h3>Device Data</h3>
       ${deviceData}
    </div> 
    
    
     `
      sensorTab.appendChild(selectedSensor)
      let tempTime=document.getElementById('tempTime')
      let temp=document.getElementById('temp')
      let energyMeterData=document.getElementById('energyMeterData')
    
      let humidityData=document.getElementById('humidityData')
      switch(id){
case 'temperature':{
    setInterval(()=>{
        fetch('http://localhost:5000/sensor/temperature')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
        let {time,temperature}=data
        temp.innerHTML=`Temperature: ${temperature}`
        tempTime.innerText=`Time: ${time}`
        if(tempconnectState){
            let postData = {
                topic: 'temperature',
                message:{
                    'time':time,
                    'temperature':temperature
                }
              };
              // Make a POST request using Axios
              let postDataString = JSON.stringify(postData);
              console.log(postDataString);
              axios.post('http://localhost:4000/publish', postDataString)
                .then(response => {
                  console.log('Response:', response);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        }

    })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },1000)
       break;
}
case 'energryMeter':{
    setInterval(()=>{
        fetch('http://localhost:5000/sensor/energymeter')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
            
        let {time,voltage,current,powerFactor,frequency}=data
        let energyValues=`
        <li>Voltage: ${voltage}<li>
        <li>Current: ${current}<li>
        <li>Power Factor: ${powerFactor}<li>
        <li>Frequency: ${frequency}<li>
        <li>Time: ${time}<li>
        `
    energyMeterData.innerHTML=energyValues
    if(energyconnectState){
        let postData = {
            topic: 'energymeter',
            message:{
                'time':time,
                'voltage':voltage,
                'current':current,
                'powerFactor':powerFactor,
                'frequency':frequency
            }
          };
          
          // Make a POST request using Axios
          let postDataString = JSON.stringify(postData);
          axios.post('http://localhost:4000/publish', postDataString)
            .then(response => {
              console.log('Response:', response);
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }


    })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },1000)
       break;
}
case 'humidity':{
    setInterval(()=>{
        fetch('http://localhost:5000/sensor/humidity')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
        let {time,humidity}=data
        humidityData.innerHTML=`<li>Humidity: ${humidity}</li>
        <li>Time: ${time}</li>`
        if(humidconnectState){
            const postData = {
                topic: 'humidity',
                message:{
                    'time':time,
                    'humidity':humidity
                }
              };
              
              // Make a POST request using Axios
              const postDataString = JSON.stringify(postData);
              axios.post('http://localhost:4000/publish', postDataString)
                .then(response => {
                  console.log('Response:', response);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        }

    })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },1000)
       break;
}
      }
      let connectbtn=document.querySelectorAll('.connect')
      let temperatureStatus=document.getElementById('temperaturestatus')
      let energryMeterStatus=document.getElementById('energryMeterstatus')
      let humidityStatus=document.getElementById('humiditystatus')
console.log(connectbtn);
connectbtn.forEach((e)=>{
    e.addEventListener('click',(e)=>{
        let id=e.target.id
        console.log(id);
        console.log('connect clicked');
        switch(id){
            case 'temperatureConnect':{
                tempconnectState=true
                temperatureStatus.innerText='Connected'
                console.log(tempconnectState);
                break
            }
            case 'energryMeterConnect':{
                energyconnectState=true
                energryMeterStatus.innerText='Connected'
                break
            }
            case 'humidityConnect':{
                humidconnectState=true
                humidityStatus.innerText='Connected'
                break
            }
        }
    })
})
let disconnectbtn=document.querySelectorAll('.disconnect')
console.log(connectbtn);
disconnectbtn.forEach((e)=>{
    e.addEventListener('click',(e)=>{
        let id=e.target.id
        console.log(id);
        console.log('connect clicked');
        switch(id){
            case 'temperatureConnect':{
                tempconnectState=false
                temperatureStatus.innerText='Disconnected'
                console.log(tempconnectState);
                break
            }
            case 'energryMeterConnect':{
                energyconnectState=false
                energryMeterStatus.innerText='Disconnected'

                break
            }
            case 'humidityConnect':{
                humidconnectState=false
                humidityStatus.innerText='Disconnected'

                break
            }
        }
    })
})

      
    })

});

