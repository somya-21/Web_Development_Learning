const express=require('express')
const app=express()
const fs = require("fs");
let users=require("./task.json")
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
// get all data
app.get("/",(req,res)=>
{
    res.json(users)

})

// app.get("/api/users",(req,res)=>
// {
//   res.json(users)
 
// })


app.get("/users",(req,res)=>
{
    const html=`
    <ul>
    ${users.map((users)=>`<li>
        ${users.first_name}
        </li>`).join(" ")}
    </ul>`
    res.send(html)
})

// app.get("/api/users",(req,res)=>
// {
    
// res.json(users)
// })


// . Using Route Parameter (Recommended)
app.get("/api/users/:id",(req,res)=>
{
    const id=Number(req.params.id);
const user=users.find((user)=>
{
return user.id===id
}
)
return res.json(user)

})

app.post("/api/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
         first_name: req.body.first_name,
        email: req.body.email
    };
  // Read existing data

    if (fs.existsSync("task.json")) {
        const data = fs.readFileSync("task.json", "utf-8");

        if (data) {
            users = JSON.parse(data);
        }
    }
const existingUser = users.find(
    user => user.email === req.body.email
);
if (existingUser) {
    return res.status(400).json({
        message: "User already exists"
    });
}
    // Add new user
    users.push(newUser);
    // Save data into file
    fs.writeFileSync(
        "task.json",
       JSON.stringify(users, null, 2)
    );



    res.status(201).json(newUser);

});

app.put("/api/users/:id",(req,res)=>{

const id=Number(req.params.id);

let users=JSON.parse(fs.readFileSync("task.json","utf-8"));

const index=users.findIndex(user=>user.id===id);

if(index===-1)
{
return res.status(404).json({message:"User not found"});
}

users[index]={
id:id,
first_name:req.body.first_name,
email:req.body.email
};

fs.writeFileSync("task.json",JSON.stringify(users,null,2));

res.json(users[index]);

});

app.patch("/api/users/:id",(req,res)=>{

const id=Number(req.params.id);

let users=JSON.parse(fs.readFileSync("task.json","utf-8"));

const user=users.find(user=>user.id===id);

if(!user)
{
return res.status(404).json({message:"User not found"});
}

if(req.body.first_name)
{
user.first_name=req.body.first_name;
}

if(req.body.email)
{
user.email=req.body.email;
}

fs.writeFileSync("task.json",JSON.stringify(users,null,2));

res.json(user);

});

app.delete("/api/users/:id",(req,res)=>{

const id=Number(req.params.id);

let users=JSON.parse(fs.readFileSync("task.json","utf-8"));

const updatedUsers=users.filter(user=>user.id!==id);

fs.writeFileSync("task.json",JSON.stringify(updatedUsers,null,2));

res.json({
message:"User deleted successfully"
});

});
app.get("/api/users", (req, res) => {

    if (req.query.id) {
        const user = users.find(
            user => user.id === Number(req.query.id)
        );
        return res.json(user);
    }

    return res.json(users);

});
app.listen((3000),console.log("server Running"))