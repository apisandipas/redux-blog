class MainController {
  
  index (req, res) {
    res.send({ "Hello" : "World" })
  }

}

module.exports = new MainController()
