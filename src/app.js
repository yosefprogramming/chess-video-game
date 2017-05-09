debugger;
console.log(process.env)
require('dotenv').config(); // reads the dotenv file save in repo and modifies 
//the process .env environement variables 
// loads environment variables from a special file which are stored
// in the root of the project directory 

console.log(process.env)

const { join } =   require("path")
const { Engine } = require("node-uci")
// object destructuring, takes the property under the name on the left and binds
// to that local variable 
const morgan = require("morgan")
const express = require("express")
const app = express()

app.use(morgan('dev'))  // registering server middleware using app.use

app.use(express.static(join(__dirname, "static")))

app.use(require('cookie-parser')()); // mechanism of having the web browser remember pieces
// of information and feeding it back to the server on future requests
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


require('./passport')(app);

app.get('/bestmove/:fen', (req, res) => {

 // console.log('The browser is asking me to analyze', req.params.fen)
  console.log(`${req.user ? req.username : 'someone'} is asking me to analyze ${req.params.fen}`)


  const engine = new Engine(join(__dirname, "../lib/Stockfish/src/stockfish"))
  engine
    .chain()
    .init()
    .position(req.params.fen)
    .go({ depth: 16 })
    .then(result => {
      res.json({ bestmove: result.bestmove, info:result.info[result.info.length-1].score.value})
      engine.quit()
    })
    .catch(error => {
      console.log('error occured during analysis:', error)
      res.sendStatus(500)
      engine.quit()
    })
})

app.listen(8000, () => {
  console.log("I'm listening")
})
