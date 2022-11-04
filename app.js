
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require('lodash')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let posts = []

// Routes
app.get('/', (req, res) => {
  res.render('home', {postsList: posts});
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.get('/posts/:title', (req, res) => {
  const title = _.lowerCase(req.params.title)
  posts.forEach((elem) => {
    if (title === _.lowerCase(elem.title)){
      res.render('post', {postContent: elem})
    }
  })
})

// Handling a Blog entry
app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log("Server started on port 3000")
})
