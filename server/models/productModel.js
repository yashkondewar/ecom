const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please Enter Name to Product"], 
        trim:true
    },
    description:{
        type:String,
        required:[true, "please Enter Description of product"]
    },
    price:{
        type:Number,
        required:[true, "please Enter Description of product"],
        maxLength:[8, "price must be less than 8 charecters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required:[true, "please enter Product Category"]
    },
    Stock:{
        type: String,
        required:[true, "please enter Product Category"],
        maxLength:[100, "price must be less than 100 charecters"],
        default : 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Product", productSchema);