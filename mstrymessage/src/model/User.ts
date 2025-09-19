import { verify } from "crypto";
import mongoose, {Schema, Document} from "mongoose"; //Document is used because of typescript
import { unique } from "next/dist/build/utils";

export interface Message extends Document { //extends Document means:- that everything is the part of database mongoose and document is in mongoose thats why we extended document
    content: string; //here document means the DB's each record as well as document also contains that records and builtin methods.
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please use a valid email address']
    },
    
    password:{
        type: String,
        required: [true, "password is required"]     
    },

    verifyCode:{
        type: String,
        required: [true, "Verify Code is required"]     
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required"]     
    },
    
    isVerified: {
        type: Boolean,
        default: false,
             
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,

    },
    
    messages: [MessageSchema]
})


const UserModel = (mongoose.models.UserModel as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export default UserModel;




/* import mongoose, {Schema, Document} from mongoose
   export interface message extends Document{
      content: string,
      createdAt: Date
   }

   const MessageSchema: Schema<Message> = new Schema({
     
      content:{
        type: String,
        required: true
      },
      
      createdAt:{
        type: Date,
        required: true
      }
    
   }, 
   {timeStamps: true})
 
   export interface User extends Document{
     email: string;
     password: string;
     verifyCode: string;
     verifyCodeExpiry: string;
     isVerified: string;
     isAcceptingMessage: boolean;
     messages: Message[]
   }

   const UserSchema: Schema<User> = new Schema({
       email:{
         type: String,
         required: true,
         unique: true,
         match: [/2$, "please use a valid email address"]
       },
       username:{
         type: String,
         required: true,
         unique: true,
         trim: true
       }, 

       password: {
        type: String,
        required: true,
        unique: true
       },

       verifyCode:{
        type: String,
        required: true
        }
       
        verifyCodeExpiry:{
        type: String,
        required: true
        
        },
        
        isVerified:{
        type: String,
        required: true
        },

        isAcceptingMessage: {
        type: String,
        required: true
        
        },

        messages:[
        
        
        ]
      
   })
      
   */


   /*
   import mongoose, {Schema, Document} from "mongoose" 
   
   export interface Message extends Document{
    content: string;
    createdAt: Date.now()
   }

   const MessageSchema : Schema<Message> = new Schema({
   
    content:{ 
    type: string,
    required: true,
    unique: true
    },
    
    createdAt:{
    type: Date,
    required: true,
    }

   
   })

 export interface User extends Document{
    
 }
   const UserSchema: Schema<User> = new Schema({
   })
   */