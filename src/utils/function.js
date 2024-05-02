import axios from 'axios'


export const sendData = async (ipAddress,data) => {
  try{
    const url = ipAddress + "/api/positions"
    console.log(url);
    const res = await axios.post(url, data)  
  }
  catch (error){
    console.error(error);
  }
}

