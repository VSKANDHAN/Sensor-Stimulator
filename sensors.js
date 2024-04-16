const express=require('express')

const getTempData=require('./controlers/temperature')
const getEnergyMeterData=require('./controlers/energymeter')
const getHumidityData=require('./controlers/humidity')

const router=express.Router()


router.get('/',(req,res)=>{
    res.send('Add the Sensor name in the path to get the sensor Data')
})

router.get('/temperature',(req,res)=>{
    let data=getTempData()
    res.send(data)
})


router.get('/energymeter',(req,res)=>{
    let data=getEnergyMeterData()
    res.send(data)
})

router.get('/humidity',(req,res)=>{
    let data=getHumidityData()
    res.send(data)

})



module.exports=router