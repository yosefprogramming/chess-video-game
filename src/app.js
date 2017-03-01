const { join } = require("path")
const { Engine } = require("node-uci")
const morgan = require("morgan")
const express = require("express")
const app = express()

app.use(morgan('dev'))

app.use(express.static(join(__dirname, "static")))

app.get('/bestmove/:fen', (req, res) => {

  console.log('The browser is asking me to analyze', req.params.fen)

  const engine = new Engine('/Users/davidyomtobian/Desktop/playground/Stockfish/src/stockfish')
  engine
    .chain()
    .init()
    .position(req.params.fen)
    .go({ depth: 5 })
    .then(result => {
      res.json({ bestmove: result.bestmove })
    })
})

app.listen(8000, () => {
  console.log("I'm listening")
})
