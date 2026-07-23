import {useEffect,useState} from "react";
import API from "./api";


function Student(){


const [students,setStudents]=useState([]);

const [page,setPage]=useState(1);

const [totalPages,setTotalPages]=useState(1);


const [form,setForm]=useState({

name:"",
age:""

});




// GET STUDENTS

const getStudents=async()=>{


const res = await API.get(
`/students?page=${page}&limit=5`
);


setStudents(
res.data.data
);


setTotalPages(
res.data.totalPages
);


};




useEffect(()=>{

getStudents();

},[page]);




// INPUT CHANGE

const changeHandler=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};




// ADD STUDENT

const addStudent=async(e)=>{

e.preventDefault();


await API.post(
"/students",
form
);


setForm({
name:"",
age:""
});


getStudents();


};




// DELETE

const deleteStudent=async(id)=>{

await API.delete(
`/students/${id}`
);


getStudents();

};




// UPDATE AGE

const updateStudent=async(id)=>{


await API.patch(
`/students/${id}`,
{
age:30
}
);


getStudents();


};



return(

<div>


<h1>
Students
</h1>



<form onSubmit={addStudent}>


<input

name="name"

placeholder="Name"

value={form.name}

onChange={changeHandler}

/>


<input

name="age"

placeholder="Age"

value={form.age}

onChange={changeHandler}

/>


<button>
Add
</button>


</form>




{
students.length===0 ?

<h3>
No Student Found
</h3>


:

students.map(student=>(


<div key={student._id}>


<h3>
{student.name}
</h3>


<p>
Age : {student.age}
</p>


<button
onClick={()=>updateStudent(student._id)}
>
Update
</button>


<button
onClick={()=>deleteStudent(student._id)}
>
Delete
</button>


</div>


))

}




<div>


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

>
Prev
</button>



<span>
Page {page} / {totalPages}
</span>



<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

>
Next
</button>



</div>


</div>

)

}


export default Student;