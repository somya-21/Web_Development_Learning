const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin:"*"
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://demo:demo@cluster0.bib29cp.mongodb.net/studentDB?appName=Cluster0")
  .then(() => console.log("hMongoDB Connected"))
  .catch((err) => console.log(err));

// API
app.get("/", (req, res) => {
  res.send("your Server Running");
});

const Student = require("./models/Student");

app.post("/students", async (req, res) => {

    try {

        console.log(req.body); // check received data

        const student = new Student(req.body);

        await student.save();

        res.status(201).json(student);

    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

});


app.get("/test", async(req,res)=>{

    res.json({
        message:"Backend working",
        database:"MongoDB Connected"
    });

});


app.get("/students", async (req, res) => {

 const students = await Student.find();

 res.json(students);

});

app.put("/students/:id", async(req,res)=>{

    try{

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        res.json(updatedStudent);

    }
    catch(error){

        res.status(500).json(error);

    }

});

app.delete("/students/:id",async(req,res)=>{


try{


await Student.findByIdAndDelete(
req.params.id
);


res.json({
message:"Student Deleted"
});


}
catch(error){

res.status(500).json(error);

}


});
app.listen(5000, () => {
  console.log("you Server Started");
});