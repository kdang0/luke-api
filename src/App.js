import './App.css';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Query from './components/Query';
import Home from './components/Home';
import Error from './components/Error';
import axios from 'axios';
function App() {
  const [listOfAttr, setListOfAttr] = useState([])
  const [resource, setResource] = useState({
    attr:"people",
    id:""
  })
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('https://swapi.dev/api/')
      .then(response => setListOfAttr(Object.keys(response.data)))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${resource.attr}/${resource.id}`);
    setResource({
      ...resource,
      id: ""
    })
  }
  const handleForm = (e) => {
    const name = e.target.name;
    if(e.target.value.length > 0){
      setResource({...resource, [name] : e.target.value})
    }
  }
  return (
      <div className="App">
        <form onSubmit = {handleSubmit}>
          <label>Search for: </label>
          <select name="attr" onBlur= {handleForm} onChange={handleForm} value={resource.attr}>
            {
              listOfAttr.length > 0 && listOfAttr.map((attr, i) => {
                return (
                  <option key={i} value={attr}>{attr}</option>
                )
              })
            }

          </select>
          <label>ID:</label>
          <input type="text" name="id" onChange={handleForm} value={resource.id}/>
          <button type="submit">Submit</button>
        </form>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:attr/:id" element={<Query />} />
          <Route path="*" element={<Error/>} />
          <Route/>
        </Routes>
      </div>
  );
}

export default App;
