import axios from 'axios'
import React, { useState,useEffect } from 'react'

interface University{
  name:string,
  web_pages:string[],
  domains:string

}

function App(){
    const[country,setCounty]=useState("");
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
      setCounty(e.target.value);
    }

    const handleClick = ()=>{
      handleGetUniversities();
    }

    const [universities , setUniversities]=useState<University[]>([]); 
    async  function handleGetUniversities(){
        try{
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
        setUniversities(response.data);
        }catch(error){
            console.log(error)

        };
}
 useEffect(()=>{
      console.log(universities);
      },[universities])
return(
    <>
    
    <input placeholder='Enter Country' onChange={handleChange}   />
    <button onClick={handleClick}>Get Universities</button>
    
    <ul>
     {universities.map((university,index)=>(
      <li key={index}>  
      <a href={university.web_pages[0]}>
        {university.name}
        </a>
      </li>
     ))}
     </ul>
    </>
)
}

export default App;