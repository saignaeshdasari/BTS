import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("DATABASE CONNECTED")
    } catch (error) {
        console.log(`Mongo db not connected ${error}`);
    }
}
export default connectDB;