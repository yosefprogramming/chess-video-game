const { join } = require("path")
const express = require("express")
const app = express()

app.use(express.static(join(__dirname, "static")))

app.listen(8000, () => {
  console.log("I'm listening")
})
