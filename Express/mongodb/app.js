const express=require('express')
const {connectDB}=require('./dbconnection')
const app=express()

app.get('/student-details',(req,res)=>
{
    // let mydb= await connectDB();
    // let studentcollection=mydb.collection("students")
    res.send('Students list ApI')
})
app.post('/add-new-student',(req,res)=>
{
    // let mydb= await connectDB();
    // let studentcollection=mydb.collection("students")
    res.send('Students insert ApI')
})
// app.delete('/delete-student')
// app.put('/update-student')
connectDB()
app.listen(3000,console.log("Server runing "))