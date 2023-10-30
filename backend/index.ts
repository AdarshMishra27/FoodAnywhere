import express from 'express'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, DB_PORT } from './config'

const app = express()

app.use(express.json());
app.use(cors());

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
})


let port = DB_PORT
if (!port) port = ""

mongoose.connect(port, { dbName: "FoodAnywhere" })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
        console.log("Connected successfully...")
});
