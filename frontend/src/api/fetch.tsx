import axios from "axios"

//The returned data already sends the data of the response, so when using it you don't need to do:
// setData(response.json), just setData(response)

export const fetchAllTransactions = async ()=>{
    try{
        const response = await axios.get("http://localhost:3333/dash")
        return response.data
    } catch(err){
        console.error(err)
    }
}

export const fetchSingleTransaction = async (id: string)=>{
    try{
        const response = await axios.get(`http://localhost:3333/dash/transactions/${id}`)
        return response.data
    } catch(err){
        console.error(err)
    }
}