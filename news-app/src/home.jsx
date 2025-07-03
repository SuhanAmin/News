import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./home.css"
import { set } from 'mongoose';

 function Home() {
  const navigate=useNavigate()
  const[image,setimage]=useState("");
  const[title,settile]=useState("");
  const[description,setdescription]=useState("");
  const[location,setlocation]=useState("");
  const[date,setdate]=useState("");
  const[time,settime]=useState("");
  const[news,setnews]=useState([]);
  const [refresh, setRefresh] = useState(false);
//const [likes, setLikes] = useState(0);


  function openmodel(){
    document.getElementById('uploadModal').style.display="block"
  }

  function closemodel(){
     document.getElementById('uploadModal').style.display="none"
  }

  useEffect(()=>{
    load()
  },[refresh])
  async function load() {

    const res=await fetch("https://news-2-zgo5.onrender.com/api/auth/home",{
      method:"GET",
      credentials:"include",
    })
   
   
    const data=await res.json()
    console.log(data);
    //console.log(data);
     
    setnews(data||[])
    
  }
  

  
   async function addlocalnews(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('time', time);
    //console.log(image,title,description,location,date,time);
    //console.log(formData);
    
    const res= await fetch("https://news-2-zgo5.onrender.com/api/auth/addlocalnews",{
      method:"POST",
      credentials:"include",
     
      body:formData,
    })
    
    .then(res=>res.json())
    .then(data=>{alert(data.msg)
      setnews([data,...news])
      closemodel()
      setRefresh(prev=>!prev)
      //load()
     
      
    })
    .catch(err=>console.log(err));
  
  }

  async function like(id) {
   
   // console.log(id);
    
    
   const res= await fetch(`https://news-2-zgo5.onrender.com/api/auth/like/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      if (res.status === 401) {
      alert("You must be logged in to like a post.");
      return;
    }
    const updatedLikes = await res.json();
   // console.log(updatedLikes);
    
    const updatedNews = news.map((item) =>
      item._id === id ? { ...item, likes: updatedLikes } : item
    );

    setnews(updatedNews);
     setRefresh(prev=>!prev)
        
  };
   
  
  
  
  
  
  return (
  <>

   <header>📱 Smart News Dashboard</header>
   
    
   <div className="container1">
    <h3 className='local'>🌍 Local News Feed</h3>
    {news.map((item,i)=>{
      
      
       return(
         <div className='upload-card' key={i}>
    <img src={item.image} />
        <h2>{item.title}</h2>
        <p>{item.description}.</p>
        <div className="upload-meta">
          <span className="location-icon">📍 {item.location}</span>
          <span>📅 {item.date}</span>
          <span>⏰ {item.time}</span>
        </div>
        <div className="upload-actions">
         
         
          
       <button onClick={() => like(item._id)}>👍 {item.likes}</button>

        </div>
</div>
       )
      

    })
    }
   


   </div>


 

 
  <div id="uploads-section" className="section">
    <button className="plus-btn" onClick={openmodel}>+</button>
    
    <div id="local-uploads"></div>
  </div>

 
 



<div className="modal" id="uploadModal">
  <div className="modal-content">
    <span className="close-btn" onClick={closemodel}>×</span>
    <h3>📝 Upload Local News</h3>
    <div className="upload-form">
      <form onSubmit={addlocalnews}>
      <input id="upload-image" type="file" onChange={(e)=>{setimage(e.target.files[0])}} placeholder="Upload Image" />
      <input id="upload-title" type="text" onChange={(e)=>{settile(e.target.value)}} placeholder="Title" />
      <textarea id="upload-description" onChange={(e)=>{setdescription(e.target.value)}} placeholder="Description"></textarea>
      <input id="upload-location" type="text" onChange={(e)=>{setlocation(e.target.value)}} placeholder="Location" />
      <input id="upload-date" type="date" onChange={(e)=>{setdate(e.target.value)}} />
      <input id="upload-time" type="time" onChange={(e)=>{settime(e.target.value)}} />
      <button >Upload</button>
      </form>
    </div>
  </div>
</div>

<footer>
  <button className="active">Local News</button>
  <button onClick={()=>{navigate("/news")}}>News</button>
  <button onClick={()=>{navigate("/profile")}}>Profile</button>
</footer>
  </>
  )
}

export default Home