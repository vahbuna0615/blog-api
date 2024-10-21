const express = require('express')
const cors = require('cors')
const blogRouter = require('./routers/blog.router')
const userRouter = require('./routers/user.router') 
const connectToDB = require('./config/db')
const { errorHandler } = require('./middlewares/error.middleware')
const { swaggerUi, specs } = require('./helpers/swagger')
require('dotenv').config();

connectToDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Blog API routes
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)

app.use(errorHandler);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Blog API"
  })
})

app.listen(5000, () => {
  console.log('Application running')
})