

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const Student = require("./models/Student");


const app = express();


app.use(cors());

app.use(express.json());


// MongoDB Connection

mongoose.connect("mongodb+srv://demo:demo@cluster0.bib29cp.mongodb.net/studentDB?appName=Cluster0")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});



// CREATE STUDENT

app.post("/api/students", async(req,res)=>{

    try{

        const student = await Student.create(req.body);

        res.status(201).json(student);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// GET STUDENTS WITH PAGINATION

app.get("/api/students", async(req,res)=>{

    try{


        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

const search = req.query.search || "";
        const skip = (page-1)*limit;



       const students = await Student.find({

name:{
    $regex:search,
    $options:"i"
}

})

.skip(skip)
.limit(limit);


        const totalStudents =
        await Student.countDocuments({

name:{
    $regex:search,
    $options:"i"
}

});



        res.json({

            currentPage:page,

            totalPages:
            Math.ceil(totalStudents/limit),

            totalStudents,

            data:students

        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


});





// UPDATE STUDENT

app.patch("/api/students/:id",
async(req,res)=>{

try{


const student =
await Student.findByIdAndUpdate(

req.params.id,

req.body,

{
    new:true
}

);


res.json(student);


}
catch(error){

res.status(500).json({
message:error.message
});

}


});





// DELETE STUDENT


app.delete("/api/students/:id",
async(req,res)=>{


try{


await Student.findByIdAndDelete(
    req.params.id
);


res.json({
message:"Student deleted"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}


});





app.listen(
5000,
()=>{
console.log(
`Server running on ${process.env.PORT}`
);
}
);