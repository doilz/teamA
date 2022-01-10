const express = require("express");
const app = express();
const test = require("./Router/test");

app.use("/api", test);

const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running --------http://127.0.0.1:${port}`);
})