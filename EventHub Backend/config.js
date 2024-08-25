const  mongoose  = require("mongoose")

const mongodbURL=`mongodb+srv://newuser:${process.env.DBPASSWORD}@cluster0.h7d2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDb = ()=>{
    return mongoose.connect(mongodbURL).then(()=>console.log("DB connected")).catch((e)=>{console.log("Failed to connect" + e)})
}

module.exports = {connectDb}