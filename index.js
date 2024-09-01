const express = require('express')
const cors = require('cors')
const blogRouter = require('./routers/blog.router') 

const app = express()

app.use(cors())

// Blogs routes
app.use('/blogs', blogRouter)

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Blog API"
  })
})

app.listen(5000, () => {
  console.log('Application running')
})