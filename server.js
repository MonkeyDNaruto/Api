const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/08da7ae232";

    const options = {
        method: "POST",
        auth: "Nischal:8c23f836a63f444483f8cb3d38269f06-us12"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.listen(3000, (req, res) => {
    console.log("Server is listening on port: 3000");
})

// API key
// 8c23f836a63f444483f8cb3d38269f06-us12

// List id
// 08da7ae232
