const mongoose = require("mongoose");
const express = require("express");
const studentRoute = require("./controller/studentRoute");
const studentSchema = require("./Model/studentschema.js");
const cors = require("cors");
const bodyParser = require("body-parser");

//MongoDB Altas Connection
mongoose.set("strictQuery",true);
// mongoose.connect("mongodb+srv://test:12345@cluster0.bucpnac.mongodb.net/schooldb");
mongoose.connect("mongodb+srv://suyashpandeyofficial:12345@cluster0.zdvjhku.mongodb.net/schooldb");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

//Creating a app
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/students",studentRoute);

//Listening to a port number
app.listen(4000,()=>{
    console.log("Server started at 4000");
})
// app.get("/", (req, res) => {
//     res.send("Welcome to the Student API"); 
// });

app.get("/", (req, res) => {
    studentSchema.find({}, (err, data) => {
        if (err) {
            res.status(500).send("An error occurred while fetching data.");
        } else {
            res.json(data);
        }
    });
});
