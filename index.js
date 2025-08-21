const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 2300;
const path = require('path');
const session = require('express-session');
const {WebSocketServer, WebSocket} = require('ws');
const http = require('http');
const connectDB = require('./config/db');
const indexRouter = require("./routes/index");

require('dotenv').config();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });


let user = [];
let proof = [];

connectDB();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(cors(
    {origin: "*", methods: ['GET, POST, PUT, DELETE'], allowedHeaders:'Content-Type,authorization'}
));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(session(
    {
     secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, }
    }
    
));
app.use('/api/v2', indexRouter);


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard', {user, proof});
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.get('/otp', (req, res) => {
   
    res.render('otp');
});

app.get('/privacy', (req, res) => {
   
    res.render('privacy');
});

app.get('/csae-policy', (req, res) => {
   
    res.render('csa');
});

server.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
});