import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        phone:{
          type:String
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:[
                "admin",
                "driver",
                "student"
            ],
            required:true
        },
        studentId:{
            type:String,
            unique:true,
            sparse:true
        },
        department:{
            type:String
        },
        year:{
            type:Number
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User",userSchema);

export default User;