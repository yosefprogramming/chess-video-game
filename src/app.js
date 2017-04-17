require('dotenv').config();

const { join } = require("path")
const { Engine } = require("node-uci")
const morgan = require("morgan")
const express = require("express")
const app = express()

app.use(morgan('dev'))

app.use(express.static(join(__dirname, "static")))

app.get('/bestmove/:fen', (req, res) => {

  console.log('The browser is asking me to analyze', req.params.fen)

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

require('./passport')(app);

app.listen(8000, () => {
  console.log("I'm listening")
})
