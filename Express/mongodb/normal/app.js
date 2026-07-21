// const express=require('express')
// const {connectDB}=require('./dbconnection')
// const app=express()

// app.get('/student-details',(req,res)=>
// {
//     // let mydb= await connectDB();
//     // let studentcollection=mydb.collection("students")
//     res.send('Students list ApI')
// })
// app.post('/add-new-student',(req,res)=>
// {
//     // let mydb= await connectDB();
//     // let studentcollection=mydb.collection("students")
//     res.send('Students insert ApI')
// })
// // app.delete('/delete-student')
// // app.put('/update-student')
// connectDB()


// app.listen(3000,console.log("Server runing "))

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://demo:demo@cluster0.bib29cp.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// API
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Started");
});