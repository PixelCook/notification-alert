import axios from "axios";

const loadData = async () => {
  try {
    const response = await axios.get("/posts")
    console.log(response)
    return response 
  }
  catch (error){
    console.log(error)
  }
}

export default loadData;