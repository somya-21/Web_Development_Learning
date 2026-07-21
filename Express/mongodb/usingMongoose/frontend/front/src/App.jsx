import {useState,useEffect} from "react";
import axios from "axios";
// useState → Used to store and update component data.
// useEffect → Used to perform actions when the component loads.
// axios → Used to send HTTP requests (GET, POST, PUT, DELETE) to the backend API.

function App(){

const API =
 "https://glorious-meme-56pxwq59q7w2rj7-5000.app.github.dev";
// Stores the backend server URL.
// GET  API/students
// POST API/students
// PUT  API/students/id
// DELETE API/students/id

const [students,setStudents]=useState([]);
// Stores all student data received from API.

// Stores the entered student name and age
const [name,setName]=useState("");
const [age,setAge]=useState("");


// editId Used to check whether we are:
// Creating a new student
// Updating an existing student

// Initially:
// editId = null
// means new student
const [editId,setEditId]=useState(null);



const getStudents=async()=>{

const res=await axios.get(
`${API}/students`
);

setStudents(res.data);

};



useEffect(()=>{

getStudents();

},[]);



const saveStudent=async()=>{


if(editId){
await axios.put(
`${API}/students/${editId}`,
{
name,
age
}
);

setEditId(null);

}

else{
await axios.post(
`${API}/students`,
{
name,
age
}
);


}


setName("");

setAge("");

getStudents();


};



const deleteStudent=async(id)=>{


await axios.delete(
`${API}/students/${id}`
);


getStudents();


};


// Fills input boxes with old data.
const editStudent=(student)=>{


setName(student.name);

setAge(student.age);

setEditId(student._id);


};



return(

<div style={{textAlign:"center"}}>


<h2>
CRUD Application
</h2>


<input

placeholder="Enter your Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>



<input

placeholder="Age"

value={age}

onChange={(e)=>setAge(e.target.value)}

/>


<button onClick={saveStudent}>

{
editId ? "Update":"Save"
}

</button>



<hr/>


{
students.map((student)=>(


<div key={student._id}>


<h3>

{student.name} - {student.age}

</h3>



<button
onClick={()=>editStudent(student)}
>
Edit
</button>



<button
onClick={()=>deleteStudent(student._id)}
>
Delete
</button>


</div>


))

}


</div>

)


}


export default App;

// I created a React CRUD application where I used useState for managing form and data states, useEffect for fetching initial data, and Axios for API communication. The application performs GET, POST, PUT, and DELETE operations through REST APIs. I used conditional rendering to handle both create and update functionality in the same form