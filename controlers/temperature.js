function TemperatureData(){
let getTime=new Date().toISOString()

let temp=Math.random() * (300 -120) + 120;
let getTemperature=`${temp.toFixed(2)}°C`
return {time:getTime,temperature:getTemperature}
}



module.exports=TemperatureData

