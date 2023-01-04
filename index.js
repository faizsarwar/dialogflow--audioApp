const {Suggestions} = require('actions-on-google');
const {Suggestion} = require("dialogflow-fulfillment");
const {WebhookClient,Image}=require("dialogflow-fulfillment");
const { request, response, json } = require("express");
const express=require("express");
const app=express();

// dialogflow app pr post ki request bhejegaa

app.get("/",(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
})


app.post("/audio",express.json(),async (request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga 
    const agent=new WebhookClient({request:request,response:response});

    function feedback(agent){
        console.log("intent called")
        agent.add('<speak><audio src="https://osori.direct.quickconnect.to/02_osori/014.mp3">did not get your audio file</audio></speak>')
    }

    let intentMap= new Map();
    intentMap.set("Test Audio Options", feedback)
    agent.handleRequest(intentMap)
})

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log("server is up on 4000");
})