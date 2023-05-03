const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const mongoUrl = 'mongodb://localhost:27017';
//const mongoUrl = 'mongodb://myUserAdmin:jigs6599@104.154.156.143:27017/test?authSource=admin';
const app = express();
const port = process.env.PORT || 3000;
//const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const database = require('./utils/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const ejs = require("ejs");

app.set("view engine", "ejs");
// app.set("view engine", "pug");
// Task routes
app.use('/api/tasks', taskRoutes);
app.use(express.static(' copy/public'));

app.listen(port, () => console.log(`Server started on port ${port}`));


// connect to the database
mongoose.connect(mongoUrl, database.options)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database:', err.message);
  });
  var path = require('path');
app.get('/api/tasks',(req,res)=>{
    const v='/public/main.html'
    str=__dirname
    console.log(str)
    console.log(str.length);
    let part = str.substr(0, 35);

   console.log(part+v)
  // console.log()
    res.sendFile(part+v)
})

