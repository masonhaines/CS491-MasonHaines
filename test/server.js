///////////////////////-------------this is all that is required to get the index.js and the css as well as the tictactoe js to a local host -------------///////

// requires type:modules
// import express from 'express'
// import path from 'path'

// requires type:commonjs
const express = require('express'); 
const path = require('path');

// const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname))); // run local host from current folder
// app.use(express.static(process.cwd())); // https://expressjs.com/en/starter/static-files.html
// app.get("/", (req, res) => {
//     res.sendFile(process.cwd() + "/index.html")
// });

app.listen(port, () => console.log(`Listening at port http://localhost:8080`));

///////////////////////////-----------------------------STOP HERE FOR SOFT FUNCTIONING SERVER TO LOCAL HOST----------------------------//////////////////////////////////

///////////////////////////-----------------------------ROUTE HANDLERS----------------------------//////////////////////////////////

app.get('/', (request, response) => {
    
})

///////////////////////////-----------------------------ROUTE HANDLERS----------------------------//////////////////////////////////

