// const express= require('express')
// const app =express()
// const routes=require('./source/route')
// const cors = require( 'cors' )

// app.use(express.json())
// app.use('/order', routes)
// app.use(cors())
// app.get=(req, res)=>{
//     console.log('server is up and running')
// }
// app.listen(5000, ()=>{
//     console.log('server running')
// })

const express = require('express')
const app = express()
const mongoose= require('mongoose')
const cookieParser=require('cookie-parser')
const cors = require('cors')
// const c=require('./console')
const authroutes=require('./route/auth/authroute')
const adminProductsRouter=require('./route/admin/products-route')
mongoose.connect("mongodb+srv://miketravers94:mypassword@cluster0.nhz6mz2.mongodb.net/").then(()=>{
    console.log('database is connected')
}).catch((error)=>{
    console.log(error)
})
app.use(express.json())
// app.use('/api/auth', authroutes)
// app.get('/api', (req, res)=>{
//     res.send('register')
// })

// mongoose.connect('mongodb+srv://miketravers94:password@cluster0.nhz6mz2.mongodb.net/').then(()=>console.log('successfully connected'))
// app.get('/', (req, res) => {
//     res.send('get method')
// })
app.use(cookieParser())

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );

  app.use('/api/auth',authroutes)
  app.use('/api/admin/products', adminProductsRouter)
app.listen(5000, ()=>{
    console.log('hello')
})