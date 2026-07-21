const express=require('express')
const app=express()

//eroor
// app.use((req,res,next)=>
// {
// res.send('Welcome')
// next()
// })

app.use((req,res,next)=>
{
next()

})
//below code donot run until the upper middleare send nex()
app.get("/",(req,res)=>
{
    res.send('Welcome page')
})

app.get("/products",(req,res)=>
{
    res.send('Product page')
})
app.listen((3000),console.log("Server Running"))