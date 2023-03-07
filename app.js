const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');


// define Mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contactUs = mongoose.model('contactUs', contactSchema);



// Express specific stuff
app.use('/static', express.static('static'));   // for serving static files
app.use(express.urlencoded());

// pug specifi stuff
app.set('view engine', 'pug')   // set template engine as pug
app.set('views', path.join(__dirname, 'views'))  //set the views directory

// End points
app.get('/', (req,res)=>{
    
    const params={};
    res.status(200).render('home.pug', params);


});
app.get('/contactUs', (req,res)=>{
    
    const params={};
    res.status(200).render('contact.pug', params);


});

app.post('/contactUs', (req,res)=>{
    var myData = new contactUs(req.body);
    myData.save().then(()=>{
        res.send('Your data has been saved to database successfully');

    }).catch(()=>{
        res.status(400).send("item was not able to save to database")
    })

    
    
    // res.status(200).render('contact.pug');


});


app.get('/home', (req,res)=>{
    
    const params={};
    res.status(200).render('home.pug', params);


});


// Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully at port https:/localhost:${port}`);
})

