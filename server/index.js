const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./configurations/database")
const cloudinary = require('cloudinary')
//uncaught Errors
process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err}`);
    console.log("Closing Server by uncaughtException");
    process.exit(1);
})
//configuration
dotenv.config({path:"server/configurations/config.env"})

//db connection
connectDB()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.COUDINAY_API_SECRET,
})


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Start at ${process.env.PORT}`);
})


//unhandled rejection by server
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err}`);
    console.log("Closing Server");

    server.close(()=>{
        process.exit(1);
    })
})