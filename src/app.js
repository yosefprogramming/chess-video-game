const { join } = require("path")
const morgan = require("morgan")
const express = require("express")
const app = express()

app.use(morgan('dev'))

app.use(express.static(join(__dirname, "static")))

app.get('/bestmove/:fen', (req, res) => {

  console.log('The browser is asking me to analyze', req.params.fen)
  res.json({ bestmove: 'e7e6' })
})

app.listen(8000, () => {
  console.log("I'm listening")
})
