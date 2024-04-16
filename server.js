const express=require('express')
const fs=require('fs')
const app=express()
app.use(express.static('public'));


const sensorRoute=require('./sensors')
app.use('/sensor',sensorRoute)

app.get('/',(req,res)=>{
let index=fs.readFileSync('./public/index.html')
res.write(index)
})
app.listen(5000,()=>{
    console.log('Server Started at port 5000');
})