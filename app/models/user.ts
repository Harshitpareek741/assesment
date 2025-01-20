import mongoose from 'mongoose';


const userSchema = new Schema({
     email : {
        type : String  , 
        required : true 
     }
})