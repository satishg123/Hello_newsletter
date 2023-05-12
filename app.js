const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const app=express();
const https =require("https");
const dotenv=require("dotenv").config();
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function(req, res)
{
    res.sendFile(__dirname+ "/Signin.html");
})

app.post("/", function(req, res)
{
    const firstname=req.body.fname;
    const lastname= req.body.lname;
    const email=req.body.email;
    const api_key="satishg:"+process.env.API_KEY;

    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]

    }

    const jsonData= JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/ade838a260"
    const options={
        method:"POST",
        auth:"satishg:"+process.env.API_KEY
    }
   const request= https.request(url, options, function(response)
    {

        if(response.statusCode===200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data)
        {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);

    request.end();

    // console.log(firstname, lastname);
})

app.post("/failure", function(req,res)
{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function()
{
    console.log("server is listening on port 3000:");
    
})




// Audience ID
// ade838a260.


