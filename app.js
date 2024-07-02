import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import { extractIP } from "./functions/func.js"

const app = express()
dotenv.config()


const PORT = process.env.PORT
const KEY = process.env.API_KEY

// middlewares
app.use(cors());
app.use(express.json())

app.get("/api/hello", async (req, res) => {

    const userIP = extractIP(req.ip)
    const userName = req.query.visitor_name

    try {

        if(userName){

            const apiCall = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${userIP}&aqi=no`)
            const apiData = apiCall.data
            const response = {
                "client_ip": userIP,
                "location": apiData.location.region,
                "greeting": `Hello ${userName}!, the temperature is ${apiData.current.temp_c} degrees Celsius in ${apiData.location.region}`
            }
            
            res.status(200).json(response)
        }else{

            res.status(401).json("please provide a visitor_name as a query parameter")

        }
    } catch (error) {

        res.status(501).json(error.message)
        
    }

})

app.listen(PORT || 8000, () =>  {
    console.log(`server running on port ${process.env.PORT}`)
})
