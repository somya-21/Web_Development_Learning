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


// app.get("/students", async (req, res) => {

//  const students = await Student.find();

//  res.json(students);

// });

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

// app.get("/students/search/:keyword", async(req,res)=>{

//     try{

//         const keyword = req.params.keyword;


//         const students = await Student.find({
// // $regex

// // MongoDB regex searches patterns
// // $options:"i"

// // Means case insensitive.
//             name:{
//                 $regex: keyword,
//                 $options:"i"
//             }

//         });


//         res.json(students);


//     }
//     catch(error){

//         res.status(500).json({
//             message:error.message
//         });

//     }

// });


// app.get("/students/filter/:age",async(req,res)=>{

// try{


// const age=req.params.age;


// const students=await Student.find({

// age:{
// $gte:age
// }

// });


// res.json(students);


// }

// catch(error){

// res.status(500).json(error);

// }

// });
//error
// app.get("/students", async(req,res)=>{

// try{

// const {search,age,sort}=req.query;


// let filter={};


// // Search condition

// if(search){

// filter.name={
//     $regex:search,
//     $options:"i"
// };

// }


// // Age condition

// if(age){

// filter.age={
//     $gte:Number(age)
// };

// let sortOption={};
// // if(sort==="name"){

// // sortOption={
// // name:1
// // };

// // }
// if(sort==="age"){

// sortOption={
// age:1//asecending
// // age:-1//des
// // name:1 //A-Z
// //name:-1 //z-a
// };

// }
// }



// const students = await Student.find(filter).sort(sortOption);;


// res.json(students);



// }

// catch(error){

// res.status(500).json({
// message:error.message
// });

// }


// });


//sort,serach,filtert
app.get("/students", async(req,res)=>{

try{


const {
search,
age,
sort
}=req.query;


let filter={};


// Search

if(search){

filter.name={
$regex:search,
$options:"i"
};

}


// Filter age

if(age){

filter.age={
$gte:Number(age)
};

}


// Sorting

let sortOption={};


if(sort==="name"){

sortOption={
name:1
};

}


if(sort==="age"){

sortOption={
age:-1
};

}



const students = await Student
.find(filter)
.sort(sortOption);



res.json(students);


}
catch(error){

res.status(500).json(error);

}

});


app.listen(5000, () => {
  console.log("you Server Started");
});