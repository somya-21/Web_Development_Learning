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

const [sort,setSort]=useState("")
// editId Used to check whether we are:
// Creating a new student
// Updating an existing student

// Initially:
// editId = null
// means new student
const [editId,setEditId]=useState(null);

const [search,setSearch]=useState("");

const getStudents=async()=>{

// const res=await axios.get(
// `${API}/students`
// );
const res=await axios.get(
`${API}/students?
search=${search}
&age=${age}
&sort=${sort}`

// `${API}/students?search=${search}&age=${age}`

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


// const searchStudent = async(keyword)=>{

// try{

// if(keyword===""){

// getStudents();

// return;

// }


// const res = await axios.get(

// `${API}/students/search/${keyword}`

// );


// setStudents(res.data);


// }

// catch(error){

// console.log(error);

// }

// }
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

const filterAge=async(age)=>{


if(age===""){

getStudents();

return;

}


const res=await axios.get(

`${API}/students/filter/${age}`

);


setStudents(res.data);


};

return(

<div style={{textAlign:"center"}}>


<h2>
CRUD Application
</h2>

<input

placeholder="Search Student"

value={search}

onChange={(e)=>{

setSearch(e.target.value)

// searchStudent(e.target.value)

}}

/>
<br></br>
<br/>
<select

// onChange={(e)=>filterAge(e.target.value)}
onChange={(e)=>setAge(e.target.value)}
>

<option value="">
All
</option>


<option value="18">
18+
</option>


<option value="20">
20+
</option>


<option value="25">
25+
</option>


</select>

<button onClick={getStudents}>
Search
</button>
<br></br>
<br></br>
<select

onChange={(e)=>setSort(e.target.value)}

>

<option value="">
Sort By
</option>


<option value="name">
Name A-Z
</option>


<option value="age">
Age Low-High
</option>


</select>

<br /><br />

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
    students.length===0 ?

<h3>
No Student Found
</h3>

:
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