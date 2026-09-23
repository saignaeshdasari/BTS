import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique:true
    },
    registrationNumber:{
      type:String,
      required:true,
      unique:true
    },
    routeName:{
      type:String,
      required:true
    },
    
    driver:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      default:null
    },
   
    status: {
      type: String,
      enum: ["active","maintaince", "inactive"],
      default: "active",
    },
    isOnline:{
      type:Boolean,
      default:false
    },
    lastSeen:{
      type:Date,
      default:null
    }
  },

  {
    timestamps: true,
  },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
