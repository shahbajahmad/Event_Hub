const  mongoose  = require("mongoose")



const connectDb = ()=>{
    return mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("DB connected")).catch((e)=>{console.log("Failed to connect" + e)})
}

module.exports = {connectDb}