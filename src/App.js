import React, { useEffect, useState } from "react";
import loadData from "./functions/loadData";
import sendData from "./functions/sendData";
import './App.css';


function App() {
  const[loader, setLoader] = useState(true);
  const[notifications, setNotifications] = useState([]);
  const[notification, setNotification] = useState("");
  const[randomTimeout, setRandomTimeout] = useState("")
  const[duration, setDuration] = useState("");
  const[userID, setuserID] = useState("");
  const[index, setIndex] = useState(0);

  const closeNotification = () => {
    // send userID, notification type
    sendData(userID, notification);
  };

  const clock = () => {
     setInterval(function() {
      setIndex(Math.floor(Math.random() * notifications.length-1)+1);
      console.log("testing", randomTimeout)
    }, 1000)
    }
 
  useEffect( () => {
    loadData().then(response => {
      setNotifications(response.data.notifications);
      setRandomTimeout(response.data.timeout);
      setDuration(response.data.duration);
      setLoader(false);
    })
    clock()
   
  }, [])

  return (
    <>
   { (loader && <h1>LOADING</h1>) || 
  <div className="main">
    <h1>RANDOM NOTIFICATIONS</h1>
    <p>For your consideration: <br></br> Zachary Gould</p>
    <div key={Math.random()} className={`notification ${notifications[index].type === 'Error' ? 'error': notifications[index].type === 'Info' ? 'info' : notifications[index].type === 'Success' ? 'success' : notifications[index].type === 'Warning' ? 'warning' : ""}`}>
      <button onClick={closeNotification}><h2>x</h2></button>
      <h1>{notifications[index].type}</h1>
      <p>{notifications[index].message}</p>
    </div>
  </div>
    }
</>
)
  }
export default App;
