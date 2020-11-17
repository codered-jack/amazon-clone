const functions = require('firebase-functions');

const express = require("express");

const cors = require("cors");
const { response } = require('express');

const stripe = require("stripe")('sk_test_51HoLtYLoxlv18OKZjUTIjp9S2kzdX2x5a2DrTEEJALXkaUqlDWk339nS1ujcDrSijlMPz35BHmoLPMsaxyzSHuxW00R5hmLfaL')


const app = express();

app.use(cors({origin:true}))
app.use(express.json());

app.get('/',(request,response)=>response.status(200).send('Hello World'))

app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });

})

exports.api = functions.https.onRequest(app) 


//http://localhost:5001/clone-fb9f7/us-central1/api