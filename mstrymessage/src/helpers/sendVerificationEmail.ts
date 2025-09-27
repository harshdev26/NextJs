import {resend} from "@/lib/resend"; //importing the resend instance 
import VerificationEmail from "../../emails/VerificationEmail";//importing the Verification Email
import { ApiResponse } from "@/types/ApiResponse";//importing the ApiResponse type 

export async function sendVerificationEmail( //function to send verification email
       email: string, //email of the user 
       username: string,// username of the user 
       verifyCode: string ///verification code to be sent to the user because user needs to verify their account
): Promise<ApiResponse>{ // returning a promise of the ApiResponse type because this function is asynchronous and will return a promise that resolves to an object of the ApiResponse type 
    try{
    
    await resend.emails.send({ // sending the email using the resend instance
    from: 'Acme <onboarding@resend.dev>', 
    to: ['delivered@resend.dev'],
    subject: 'Mystery Message Verification Code',
    react: VerificationEmail({ username, otp: verifyCode }), //using the VerificationEmail component to create the email template and passing the username and verifyCode as props to the component
  });
    return {success: true, message: 'Verification email send success'}
    
} catch (emailError){
        console.log("Error sending Verification email", emailError)
        return {success: false, message: 'Failed to send verification email'}
    }
}


/*
import {resend} from "@/lib/resend";
import verificationEmail from "../../emails/VerificationEmail";
import {ApiResponse} from "@/types/ApiResponse"

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string, 
): Promise<ApiResponse>{
  try{
    
   await resend.emails.send({
     from: 'tiwariharsh2604@gmail.com',
     to: email,
     subject: 'Mystery message Verify Code',
     react: VerificationEmail({username, otp: verifyCode}),

   }); 

    return{ success: true, message: "Verification email sent successfully. " };


  }  catch( emailError ){
      console.log('Error sending Verification email:', emailError)
      return { success: false, message: 'Failed to send verification email.'}
      }
 
}





import resend from '@/lib/resend'
import VerificationEmail from "../../emails/VerificationEmail"
import ApiResponse from '@/types/ApiResponse'


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse>{
  try{
    from: "tiwariharsh2604@gmail.com",
    to: "dev@gmail.com",
    subject: "Mystery Message verifyCode",
    react: VerificationEmail({username, otp: verifyCode})
    return{ success: true, message: 'verification email send successfully'}
  }catch(emailError){
    {success: false, message: 'Failed Verification Code'}
  
  }

}


import resend from @/lib/resend
import VerificationEmail from ../../emails/VerificationEmail;
import {ApiResponse} from "@/types/ApiResponse";

export async function sendVerificationEmail(
 email: string,
 username: string,
 verifyCode: string

)promise:<ApiResponse>{
 try{ from: 'tiwariharsh2604@gmail.com',
  to: 'dev@gmail.com',
  subject: 'Mystery Message verification Code',
  react: VerificationEmail({username, otp: verifyCode})
}
  {success:true, message: "Verification Email Code"}
  }catch(emailError){
   console.log("Email error occured", email Error)
   
   }











*/