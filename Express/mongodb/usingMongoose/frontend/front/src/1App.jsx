import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [students, setStudents] = useState([]);


  const API = "https://glorious-meme-56pxwq59q7w2rj7-5000.app.github.dev";


  // POST DATA
  const saveStudent = async () => {

    try {

      const response = await axios.post(`${API}/students`, {
        name,
        age
      });

      console.log(response.data);

      alert("Student Saved");

      // refresh list after saving
      getStudents();

    }
    catch(error){
      console.log(error);
    }

  };


  // GET DATA
  const getStudents = async () => {

    try {

      const response = await axios.get(`${API}/students`);

      setStudents(response.data);

    }
    catch(error){
      console.log(error);
    }

  };


  useEffect(() => {

    getStudents();

  }, []);



  return (

    <>

    <div style={{textAlign:"center"}}>

      <h2>Add Student</h2>


      <input
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />


      <br/><br/>


      <input
      placeholder="Age"
      value={age}
      onChange={(e)=>setAge(e.target.value)}
      />


      <br/><br/>


      <button onClick={saveStudent}>
        Save
      </button>


    </div>


    <hr/>

<div style={{textAlign:"center"}}> 
    <h2>Students List</h2>


    {
      students.map((student)=>(

        <div key={student._id}>

          <h3>
            {student.name} - {student.age}
          </h3>

        </div>

      ))
    }

</div>
    </>

  );
}


export default App;