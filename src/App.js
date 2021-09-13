import React from "react";
import './App.css';

function App() {
  const closeNotification = () => {
    // send userID, notification type
    console.log("hey")
  }

  return (
  <div className="main">
   <h1>RANDOM NOTIFICATIONS</h1>
   <p>For your consideration: <br></br> Zachary Gould</p>
   <div className="notification alert">
    <button onClick={closeNotification}><h2>x</h2></button>
    <h1>This is a notification</h1>
    <p>You have been notified</p>
   </div>
  </div>
  );
}

export default App;
