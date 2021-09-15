import axios from "axios";

const sendData = async (userID, notification) => {
  try {
    await axios.post("/noted", {
      user: userID,
      notification: notification
    })
  }catch(error){
    console.log(error)
  }
}

export default sendData;