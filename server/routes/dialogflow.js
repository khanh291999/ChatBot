const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');
const axios = require('axios')
const app = express();
const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
let array = [];



// Text Query Route

router.post('/textQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent text');
    const result = responses[0].queryResult;
    const result1 = responses[0].queryResult.queryText;
    const result2 = responses[0].queryResult.fulfillmentText;
    // Test
    let username = "";
    let email = "";
    let address = "";
    // // if(responses[0].queryResult.fulfillmentText = "Please tell me your name"){
    // //     // username = responses[0].queryResult.fulfillmentText;
    // //     username = "khanh";
    // // }
    // // if(responses[0].queryResult.queryText == "Please tell me your email"){
    // //     email = responses[0].queryResult.fulfillmentText;
    // // }
    // // if(responses[0].queryResult.queryText == "Where do you live"){
    // //     address = responses[0].queryResult.fulfillmentText;
    // // }
    postdata=(username,email,address)=>{
        username = array[1];
        email = array[2];
        address = array[3];
        axios.post('http://localhost:5000/opinion',{
            username,
            email,
            address
        },)
        .then(res=>{
            console.log('res',res)
            console.log('array', array)
        }).catch(err=>{
            console.log(err);
        })
    }
    
    if (result2.includes('name') === true) {
        username = result1;
        array.push(`${result1}`);
        console.log("Usernameeeeeeeeeeeeeeeeeeeeee",username);
    }
    if (result2.includes("email") === true) {
        email = result1;
        array.push(`${result1}`);
        console.log("Emaillllllllllllllll",email);
    }
    if (result2.includes("live") === true) {
        address = result1;
        array.push(`${result1}`);
        console.log("Addressssssssss",address);
    }
    if (result2.includes('Thank you') === true) {
        array.push(`${result1}`);
        postdata(username,email,address)
        // res.send(result)
    }

    // console.log('array', array)
    // console.log('Query text',result1);
    // console.log('fulfillment',result2);
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);

    // if (responses[0].queryResult.queryText == "give opinion"){
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    // }

    // axios.post('http://localhost:5000/opinion',{
    //     result1,
    //     result2
    // },)
    // .then(res=>{
    //     console.log('res',res)
    // }).catch(err=>{
    //     console.log(err);
    // })

    res.send(result)
})



//Event Query Route

router.post('/eventQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent event');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    console.log(`  Intent: ${result.intent}`);
    console.log(`  fulfill: ${result.fulfillmentMessages}`);
    console.log(`  para: ${result.parameters}`);
    console.log(`  output: ${result.outputContext}`);

    // console.log(result.intent);
    // console.log(result.fulfillmentMessages);
    // console.log(result.parameters);
    // console.log(result.outputContext);

    res.send(result)
})







module.exports = router;
