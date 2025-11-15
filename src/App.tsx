import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import './App.css'

interface University {
  name: string;
  web_pages: string[];
  domains: string[];
}

function App() {
  const [country, setCounty] = useState("");
  const [error, setError] = useState("");
  const [uniCount, setUniCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl]=useState("")
  const [showModal,setShowModal]=useState(false)
  const [iframeLoading,setIframeLoading]=useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounty(e.target.value);
  };

  const handleClick = () => {
    handleGetUniversities();
  };



  const [universities, setUniversities] = useState<University[]>([]);
  async function handleGetUniversities() {
    setLoading(true);
    setError("");
    if (!country.trim()) {
      setError("Please Provide a Country");
      setLoading(false);
    }
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`,
      );
      const universityData =response.data;
      setUniversities(universityData);
      if (universityData.length === 0) {
      setError(`No Universities found in : ${country}`);
    }
    } catch (error) {
      console.log(error);
      setError("Failed getting universities");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setUniCount(universities.length)
    //console.log(universities);
  }, [universities]);
  return (
    <>
    
      <h2 className="appHeader">UNIVERSITY SEARCH</h2>

    <section>
    
      <input value={country} type="text" className="searchInput" placeholder="Enter Country" onChange={handleChange} />
      <button onClick={handleClick} disabled={loading} className="searchBtn">
      <FaSearch />
      </button>
      </section>
      <section>
        {error && <p className="uniCount" style={{ color: "red" }}>{error}</p>}
        {uniCount > 0 && (
          <h3 className="uniCount">{uniCount} Universities in {country}</h3>
        )}
      </section>
        {universities.map((university, index) => (
          <div key={index}>
            <div className="universityCard">
            <div className="cardContainer">
              <h4><b>{university.name}</b></h4>
            <p><a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a></p>
             <button className="viewUniversityBtn" onClick={() => {
                setSelectedUrl(university.web_pages[0]);
                setIframeLoading(true); // start loader
                setShowModal(true);
              }}>
                View
              </button>
              
            </div>
            </div>
          </div>
        ))}
   
 <div className={`modalOverlay ${showModal ? "show" : ""}`}>
<div className="modalContent">
<button className="closeBtn" onClick={() =>{ 
      setShowModal(false);
      setIframeLoading(false);
    }}>×</button>

    {iframeLoading && <div className="loader" style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}></div>}
    <iframe
    className="modalIframe"
    src={selectedUrl}
    title="University Website"
    onLoad={() => setIframeLoading(false)}
    style={{ display: iframeLoading ? 'none' : 'block' }} 
  ></iframe>
</div>
</div>



      
    </>
  );
}

export default App;
