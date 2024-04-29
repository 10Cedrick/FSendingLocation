import axios from 'axios'


export const sendData = async (ipAddress,data) => {
  try{
    const url = ipAddress + "/positions"
    const res = await axios.post(url, data)  
  }
  catch (error){
    console.error(error);
  }
}

