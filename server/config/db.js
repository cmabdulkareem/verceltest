import mongoose from 'mongoose'
mongoose.connect("mongodb+srv://kareem:cadd123@sample.kvxwkea.mongodb.net/perfume")
.then(()=>{
  console.log("connected to mongodb");
  
})
.catch((err)=>{
  console.log(err);
})