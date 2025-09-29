import {getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";



export async function POST(request:Request) {
      await dbConnect();

      const session = await getServerSession(authOptions); //getServerSession will give the currently logged in user
      const user: User = session?.user;
      if(!user){
   
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );

      }
      
    const userId = user._id;
    const {acceptMessages} = await request.json(); 

        try {
            // Update the user's acceptMessages field in the database
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { isAcceptingMessage: acceptMessages },
                { new: true } // to return the updated document
            );
    
            return Response.json(
                { success: true, message: 'Accept messages status updated', user: updatedUser },
                { status: 200 }
            );


    if (!updatedUser) {
      // User not found
      return Response.json(
        {
          success: false,
          message: 'Unable to find user to update message acceptance status',
        },
        { status: 404 }
      );
    }

    // Successfully updated message acceptance status
    return Response.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        updatedUser,
      },
      { status: 200 }
    );
           
        } catch (error) {
            return Response.json(
                { success: false, message: 'Error updating accept messages status', error: error instanceof Error ? error.message : String(error) },
                { status: 500 }
            );
        }
    }


 export async function GET(request: Request){
   // Connect to the database
   await dbConnect();

   const session = await getServerSession(authOptions);
   const user = session?.user;
   
   //Check if the user is authenticated
   
   if(!user){
    return Response.json({
        success: false,
        message: 'Not authenticated',

    },
    {status: 401})
   }


    try {
        // Retrieve the user from the database using the _id
        const foundUser = await UserModel.findById(user._id);

        if(!foundUser){
            return Response.json({
                success: false,
                message: 'User not found',
                
            },
        {status: 404});
        
     }
        //Return the acceptMessages status
        return Response.json({
            success: true,
            isAcceptingMessages : foundUser.isAcceptingMessage,

        },
        {status: 200});
     
    } catch (error) {
        console.error('Error retrieving message acceptance status: ', error);

        return Response.json({
            success: false, message: 'Error retrieving message acceptance status',
            
        },
    {status: 500}
  
 )
    
  }
}