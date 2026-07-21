import {useState,useEffect} from "react";
import axios from "axios";


function App(){

const API =
 "https://glorious-meme-56pxwq59q7w2rj7-5000.app.github.dev";



const [students,setStudents]=useState([]);

const [name,setName]=useState("");

const [age,setAge]=useState("");

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



const editStudent=(student)=>{


setName(student.name);

setAge(student.age);

setEditId(student._id);


};



return(

<div>


<h2>
CRUD Application
</h2>


<input

placeholder="Name"

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