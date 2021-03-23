const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
// const Opinion = require('./server/models/Opinion')
const mongoose = require('mongoose');
const config = require("./server/config/keys");

// const mongoose = require("mongoose");
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MONGODB_URI = 'mongodb+srv://khanh:khanh123@rest.ycmu9.mongodb.net/khanh?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

mongoose.connection.on('connected', ()=>{
  console.log('Mongoose is connected!!!!!')
})

const opinionSchema =  mongoose.Schema({
  username: String,
  email: String,
  address: String
  // result1: String,
  // result2: String

  // location: String,
  // registerDate: Date
});

const Opinion = mongoose.model('opinion', opinionSchema);

// app.use(express.json());
// app.use(express.urlencoded({extended: false}))
// We will make two routes 
app.get('/opinion', (req, res) =>{
    const data = {
    };
  
    Opinion.find({})
    .then((data)=>{
        // console.log('Data: ', data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ', daerrorta)
    })
  });

  app.post('/opinion', (req,res)=>{
    const data = req.body;

    const newOpinion = new Opinion(data);
    newOpinion.save((error)=>{
        if(error){
            res.status(500).json({msg:'Sorry, internal server errors'});
        }
        return res.json({
            msg: ' Your data has been saved!!!'
        })
    })
})

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
