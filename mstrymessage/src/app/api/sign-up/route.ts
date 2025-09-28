//we are creating this file just because this file is used to handle the sign up request from the client side and this file is also used to create a new user in the database 


import { dbConnect } from '@/lib/dbConnect'; //this is using to connect database because this is the file where we are connecting to the database 
import UserModel from '@/model/User'; //use of this file is to access the user model because this file contains the schema of the user Model
import bcrypt from 'bcryptjs'; //we are using bcryptjs because this is used to hash the password of the user before storing it in the database 
import {sendVerificationEmail} from '@/helpers/sendVerificationEmail';//this is using because this file contains the function to send the verification email to the user 


export async function POST(request: Request) {

    await dbConnect(); //this is used to connect to the database
    try {
        const {username, email, password} = await request.json(); //this is used to get the data from the request body.

        const existingVerifiedUserByUsername = await UserModel.findOne({ //this function basically used to handle the post request from the client sendVerificationEmail side when the user is trying to sign up
            username,
            isVerified: true,
        }); 
        if(existingVerifiedUserByUsername){
            return Response.json(
                {
                    success: false,
                    Message:'Username is already taken',

                },
                    {status: 400}
                
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); //this is used to generate a random 6 digit verification code and we are converting it to string because we are storing it in the database as a string.

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json(
                {
                    success: false,
                    Message:'User already exists with this email',

                },
                    {status: 400}

            );

            } else{
                const hashedPassword = await bcrypt.hash(password, 10); //we are hashing the password because may be the user is trying to sign up again because may be the user forget the old password and 10 means number of rounds to hash the password
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode; //we are updating the verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save(); //we are saving the user to the database

            }
            
        } else{
            const hashedPassword = await bcrypt.hash(password, 10) //same
            const expiryDate = new Date(); // we are setting the expiry date of the verification code to 1 hour from now
            expiryDate.setHours(expiryDate.getHours() + 1); //setting the expiry date of the verification code to 1 hour from now 
            
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []

            })
            await newUser.save();
        }


        //Send Verification email

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode // 
        );

        if(!emailResponse.success) { 
            return Response.json(
                
                {
                    success: false,
                    message: emailResponse.message 
                },
                {status: 500}
            );
        }

        return Response.json(
        {
            success: true,
            message: 'User registered successfully. please verify your account.'
        },
        {status: 201}
        );

    } catch (error){
        console.log('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            {
                status: 500
            }
        );
    }
}

/*
import dbConnect
import UserModel
import bcrypt
import sendVerificationEmail


export async function POST(request:Request){
await dbConnect();

const {username, email, password} = await request.json()

const existingUsername = await UserModel.findOne({
  username,
  isVerified: true
})

if(existingUsername){
 return Response.json(
 {
   success: true,
   message: "Username is already taken"
 },

 {status: 400}
  
 );

}

const existingUserByEmail = await UserModel.findOne({
    email
})

const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

if(existingVerifiedUserByEmail) {
 if(existingUserByEmail.isVerified){
  return Response.json({
   success: true,
   message: 'User already exists with this email'
  },
  {status: 400}
   );
 }else{
    const hashedPassword = await bcrypt.hash(password, 10)
    existingUserByEmail.password = hashedPassword;
    existingUserByEmail.verifyCode = verifyCode;
    existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
    await existingUserByEmail.save()
    }
} else {
    const hashedPassword = await bcrypt.hash(password, 10)
    const expiryDate = new Date()
    }
}
*/