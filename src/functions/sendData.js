import axios from "axios";

const sendData = async (userID) => {
  try {
    const response = await axios.post("/noted")
    console.log(response.data);
  }catch(error){
    console.log(error)
  }
}

export default sendData;