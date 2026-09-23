import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema(
    {
        bus:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Bus",
           required:true,
           index:true
        },
        latitude:{
            type:Number,
            required:true
        },
        longitude : {
            type:Number,
            required:true
        },
        speed:{
            type:Number,
            default:0
        },
        satellites:{
            type:Number,
            default:0
        },
        locationName:{
            type:String,
            default:"Unknown location"
        },
        timestamp:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamps:true
    }
);

const Location = mongoose.model("Location",locationSchema);

export default Location;