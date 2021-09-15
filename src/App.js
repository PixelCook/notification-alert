import React, { useEffect, useState } from "react";
import loadData from "./functions/loadData";
import sendData from "./functions/sendData";
import './App.css';


function App() {
  const[loader, setLoader] = useState(true);
  const[notifications, setNotifications] = useState([]);
  const[visible, setVisible]=useState(false)
  const[userID, setuserID] = useState("");
  const[index, setIndex] = useState(0);
  const[intervalId, setIntervalId] = useState("");
  const[time, setTime] = useState("");
  const[duration, setDuration] = useState("");

  const closeNotification = (index) => {
    sendData(userID, notifications[index]);
    setTimeout(()=>{
    clearInterval(intervalId)
    if (index > -1) {
      notifications.splice(index, 1);
      if(index !== 0){
        clock(notifications.length, time, duration)
      }
    }
  }, duration*1000)
  };


  const clock = (length, timeout, duration) => {
     const interval = setInterval(function() {
      setIndex(Math.floor(Math.random() * length-1)+1);
      setVisible(true);
      setTimeout(() => {
      setVisible(false)
      }, duration*1000)
    }, timeout*1000)
    setIntervalId(interval);
    }
 
  useEffect( () => {
    loadData().then(response => {
      setNotifications(response.data.notifications);
      setTime(response.data.timeout);
      setDuration(response.data.duration)
      setLoader(false);
      clock(response.data.notifications.length, response.data.timeout, response.data.duration)
    })
    setuserID(Math.floor(Math.random()*Date.now()))
    console.log(userID)
  }, [])

  return (
    <>
   { (loader && <h1>LOADING</h1>) || 
  <div className="main">
    <h1>RANDOM NOTIFICATIONS</h1>
    <p>For your consideration: <br></br> Zachary Gould</p>
    {visible && ( <div key={Math.random()} className={`notification ${notifications[index].type === 'Error' ? 'error': notifications[index].type === 'Info' ? 'info' : notifications[index].type === 'Success' ? 'success' : notifications[index].type === 'Warning' ? 'warning' : ""}`}>
      <button onClick={()=>closeNotification(index)}><h2>x</h2></button>
      <h1>{notifications[index].type}</h1>
      <p>{notifications[index].message.includes("new") ? "~~" : ""}{notifications[index].message.includes("limited edition") ? notifications[index].message.toUpperCase() : ""}{!notifications[index].message.includes("limited edition") ? notifications[index].message: ""}{notifications[index].message.includes("sale") ? "!" : notifications[index].message.includes("new") ? "~~" : ""}</p>
    </div>)}
   
  </div>
    }
</>
)
  }
export default App;
